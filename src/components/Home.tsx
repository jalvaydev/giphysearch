import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import fetchTrendingGifs from "../services/giphy/fetchTrendingGifs";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import fetchSearchGifs from "../services/giphy/fetchSearchGifs";

const Home = () => {
  const [query, setQuery] = useState("");

  const [value] = useDebounce(query, 1000);

  const { data: searchGifs, isLoading: searchIsLoading } = useQuery({
    queryKey: ["search", value],
    queryFn: () => fetchSearchGifs(value),
    enabled: 0 < value.length,
  });

  const { data: trendingGifs, isLoading: trendingIsLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrendingGifs,
    enabled: !value,
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

        <Results
          gifs={value ? searchGifs?.data ?? [] : trendingGifs?.data ?? []}
        />
      </div>
    </div>
  );
};

export default Home;
