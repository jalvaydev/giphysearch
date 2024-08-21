import API_KEY from "../../util/api";
import { GiphyResponse, giphyResponseSchema } from "./APIResponses";

const fetchTrendingGifs = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<GiphyResponse> => {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20&offset=${pageParam}`,
  );

  const json = await response.json();

  const result = giphyResponseSchema.safeParse(json);
  if (!result.success) {
    throw new Error(
      `error parsing the giphy response schema: ${result.error.issues}`,
    );
  }

  return result.data;
};

export default fetchTrendingGifs;
