import { motion } from "motion/react";
export const WatchedMovie = ({ movie, deleteWatchedMovie }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="btn-delete"
          onClick={() => deleteWatchedMovie(movie.imdbID)}
        >
          X
        </motion.button>
      </div>
    </li>
  );
};
