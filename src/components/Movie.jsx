import { motion } from "motion/react";

export const Movie = ({ movie, setSelectedId }) => {
  return (
    <motion.li
      whileHover={{ scale: 1.1, cursor: "pointer" }}
      whileTap={{ scale: 0.9 }}
      key={movie.imdbID}
      onClick={() =>
        setSelectedId((curr) => (curr === movie.imdbID ? null : movie.imdbID))
      }
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </motion.li>
  );
};
