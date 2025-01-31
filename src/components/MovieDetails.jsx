import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { StarRaiting } from "./StarRaiting";
import { Loader } from "./Loader";
import { useKey } from "../hooks/useKey";

export const MovieDetails = ({
  selectedId,
  setSelectedId,
  movieIdFetchLink,
  addWatchedMovie,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userStarRating, setUserStarRating] = useState("");

  const countRef = useRef(0);

  const isWatched = watched.map((movies) => movies.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    if (userStarRating) countRef.current++;
  }, [userStarRating]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(movieIdFetchLink + selectedId);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };

    getMovieDetails();
  }, [selectedId, movieIdFetchLink]);

  useKey("Escape", setSelectedId);

  useEffect(() => {
    if (!title) return;
    document.title = "Movies | " + title;

    return () => {
      document.title = "Movie Reviews";
    };
  }, [title]);

  const handleAdd = () => {
    const newMovie = {
      title,
      imdbID: selectedId,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      year,
      userRating: userStarRating,
      countRatingDesicision: countRef,
    };
    addWatchedMovie(newMovie);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="details">
      <header>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          className="btn-back"
          onClick={() => setSelectedId(null)}
        >
          &larr;
        </motion.button>
        <img src={poster} alt="movie poster" />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating}
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRaiting
                maxRating={10}
                size={24}
                setUserStarRating={setUserStarRating}
              />
              {userStarRating > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn-add"
                  onClick={() => {
                    setSelectedId(null);
                    handleAdd();
                  }}
                >
                  Add to your favourite movie list
                </motion.button>
              )}
            </>
          ) : (
            <p>
              You have already rated this movie {watchedUserRating}{" "}
              <span>⭐</span>
            </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Stars : {actors}</p>
        <p>Director : {director}</p>
      </section>
    </div>
  );
};
