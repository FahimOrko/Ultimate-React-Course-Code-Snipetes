import { useEffect, useState } from "react";
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

const apiKey = process.env.REACT_APP_API_URL;
const fetchLink = `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`;
const movieIdFetchLink = `https://www.omdbapi.com/?apikey=${apiKey}&i=`;

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(fetchLink + "&s=" + query, {
          signal: controller.signal,
        });

        if (!res.ok)
          throw new Error(
            "Something went wrong, Check your internet connecting or reload the page"
          );

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    setSelectedId(null);
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

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
