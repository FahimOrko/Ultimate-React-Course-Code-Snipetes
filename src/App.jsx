import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Main } from "./components/Main";
import { Search } from "./components/Search";
import { NavbarResults } from "./components/NavbarResults";
import { Box } from "./components/Box";
import { MovieInList } from "./components/MovieInList";
import { WatchedMovieList } from "./components/WatchedMovieList";
import { WatchedSumamry } from "./components/WatchedSummary";
import { Loader } from "./components/Loader";
import { ErrorMsg } from "./components/ErrorMsg";
import { MovieDetails } from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

const apiKey = process.env.REACT_APP_API_URL;
const fetchLink = `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=`;
const movieIdFetchLink = `https://www.omdbapi.com/?apikey=${apiKey}&i=`;

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(
    fetchLink,
    query,
    setSelectedId
  );

  const [watched, setWatched] = useLocalStorage([], "watched");

  const addWatchedMovie = (movie) => {
    setWatched((prev) => [...prev, movie]);
  };

  const deleteWatchedMovie = (movieId) => {
    setWatched((prevMovies) =>
      prevMovies.filter((movie) => movie.imdbID !== movieId)
    );
  };

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NavbarResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieInList movies={movies} setSelectedId={setSelectedId} />
          )}
          {error && <ErrorMsg msg={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              addWatchedMovie={addWatchedMovie}
              movieIdFetchLink={movieIdFetchLink}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ) : (
            <>
              <WatchedSumamry watched={watched} />
              <WatchedMovieList
                watched={watched}
                deleteWatchedMovie={deleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
