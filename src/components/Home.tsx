import { useInfiniteQuery } from "@tanstack/react-query";
import Results from "./Results";
import fetchTrendingGifs from "../services/giphy/fetchTrendingGifs";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import fetchSearchGifs from "../services/giphy/fetchSearchGifs";

const Home = () => {
  const loaderRef = useRef(null);

  const [query, setQuery] = useState("");

  const [debouncedQuery] = useDebounce(query, 1000);

  const {
    data: searchGifs,
    isLoading: searchIsLoading,
    fetchNextPage: searchFetchNextPage,
    hasNextPage: searchHasNextPage,
    isFetchingNextPage: searchIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: ({ pageParam }) =>
      fetchSearchGifs({ query: debouncedQuery, pageParam }),
    enabled: 0 < debouncedQuery.length,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.offset >= lastPage.pagination.total_count) {
        return undefined;
      }

      return lastPage.pagination.offset + 20;
    },
  });

  const {
    data: trendingGifs,
    isLoading: trendingIsLoading,
    fetchNextPage: trendingFetchNextPage,
    hasNextPage: trendingHasNextPage,
    isFetchingNextPage: trendingIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["trending"],
    queryFn: fetchTrendingGifs,
    enabled: !debouncedQuery.length,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.offset >= lastPage.pagination.total_count) {
        return undefined;
      }

      return lastPage.pagination.offset + 20;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        debouncedQuery ? searchFetchNextPage() : trendingFetchNextPage();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  });

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div>
          <h1 className="text-gray-50 font-bold text-2xl text-center">
            giphysearch
          </h1>

          <div>
            <label htmlFor="query" className="sr-only">
              Search Gifs
            </label>
            <input
              id="query"
              name="query"
              type="text"
              placeholder="Search gifs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="mt-2">
        {searchIsLoading || trendingIsLoading ? <div>loading</div> : null}

        <Results data={debouncedQuery ? searchGifs : trendingGifs} />

        {(debouncedQuery && searchHasNextPage) || trendingHasNextPage ? (
          <div ref={loaderRef}>
            {(searchIsFetchingNextPage || trendingIsFetchingNextPage) && (
              <div>Loading...</div>
            )}
          </div>
        ) : (
          <div>you have reached the end!</div>
        )}
      </div>
    </div>
  );
};

export default Home;
