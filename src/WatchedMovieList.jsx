import { WatchedMovie } from "./WatchedMovie";

export const WatchedMovieList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie, idx) => (
        <WatchedMovie key={idx} movie={movie} />
      ))}
    </ul>
  );
};
