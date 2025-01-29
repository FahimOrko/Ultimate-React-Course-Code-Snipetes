import { use, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Main } from "./Main";
import { Search } from "./Search";
import { NavbarResults } from "./NavbarResults";
import { Box } from "./Box";
import { MovieInList } from "./MovieInList";
import { tempWatchedData } from "./tempWatchedData";
import { tempMovieData } from "./tempMovieData";
import { WatchedMovieList } from "./WatchedMovieList";
import { WatchedSumamry } from "./WatchedSummary";
import { Loader } from "./Loader";
import { ErrorMsg } from "./ErrorMsg";
import { StarRaiting } from "./StarRaiting";

const apiKey = process.env.REACT_APP_API_URL;

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchLink = `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=ssads`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(fetchLink);

        if (!res.ok)
          throw new Error(
            "Something went wrong, Check your internet connecting or reload the page"
          );

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
      } catch (e) {
        console.log(e.message);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // console.log(movies);

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NavbarResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieInList movies={movies} />}
          {error && <ErrorMsg msg={error} />}
        </Box>
        <Box>
          <WatchedSumamry watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
      {/* <StarRaiting maxRating={5} />
      <StarRaiting maxRating={5} defaultRating={3} />
      <StarRaiting
        maxRating={5}
        masssages={["Terible", "Bad", "Okay", "Good", "Superb"]}
      /> */}
    </>
  );
}
