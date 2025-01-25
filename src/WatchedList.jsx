import { useState } from "react";
import { tempWatchedData } from "./tempWatchedData";
import { WatchedSumamry } from "./WatchedSummary";
import { WatchedMovieList } from "./WatchedMovieList";

export const WatchedList = () => {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSumamry watched={watched} />
          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  );
};
