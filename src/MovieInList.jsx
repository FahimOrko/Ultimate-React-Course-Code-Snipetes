import { Movie } from "./Movie";

export const MovieInList = ({ movies }) => {
  return (
    <div>
      <ul className="list">
        {movies?.map((movie, idx) => (
          <Movie key={idx} movie={movie} />
        ))}
      </ul>
    </div>
  );
};
