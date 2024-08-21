import { GiphyResponse } from "../services/giphy/APIResponses";

interface ResultsProps {
  gifs: GiphyResponse["data"];
}

const Results = ({ gifs }: ResultsProps) => {
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="flex flex-row flex-wrap gap-4">
      {gifs.map((gif) => (
        <div key={gif.id} className="h-40 grow ">
          <img
            className="max-h-full min-w-full object-fill align-bottom rounded-xl"
            alt={gif.alt_text}
            src={gif.images.fixed_height.webp}
            width={gif.images.fixed_height.width}
            height={gif.images.fixed_height.height}
          />
        </div>
      ))}
    </div>
  );
};

export default Results;
