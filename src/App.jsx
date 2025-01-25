import { useState } from "react";
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
import { StarRaiting } from "./StarRaiting";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  console.log(movies);
  return (
    <>
      <Navbar>
        <Search />
        <NavbarResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          <MovieInList movies={movies} />
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
