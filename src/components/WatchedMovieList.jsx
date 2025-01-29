import { WatchedMovie } from "./WatchedMovie";

export const WatchedMovieList = ({ watched, deleteWatchedMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie, idx) => (
        <WatchedMovie
          key={idx}
          movie={movie}
          deleteWatchedMovie={deleteWatchedMovie}
        />
      ))}
    </ul>
  );
};
