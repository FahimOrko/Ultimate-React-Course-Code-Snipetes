import { Movie } from "./Movie";

export const MovieInList = ({ movies, setSelectedId }) => {
  return (
    <div>
      <ul className="list">
        {movies?.map((movie, idx) => (
          <Movie key={idx} movie={movie} setSelectedId={setSelectedId} />
        ))}
      </ul>
    </div>
  );
};
