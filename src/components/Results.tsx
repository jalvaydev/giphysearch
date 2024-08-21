import { InfiniteData } from "@tanstack/react-query";
import { GiphyResponse } from "../services/giphy/APIResponses";
import { Fragment } from "react/jsx-runtime";

interface ResultsProps {
  data: InfiniteData<GiphyResponse> | undefined;
}

const Results = ({ data }: ResultsProps) => {
  if (!data) {
    return <div>no data to display</div>;
  }
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="flex flex-row flex-wrap gap-4">
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((gif) => (
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
        </Fragment>
      ))}
    </div>
  );
};

export default Results;
