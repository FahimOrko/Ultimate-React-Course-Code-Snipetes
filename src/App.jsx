import { useState } from "react";
import Navbar from "./Navbar";
import { Main } from "./Main";
import { Search } from "./Search";
import { NavbarResults } from "./NavbarResults";
import { MovieList } from "./MovieList";
import { WatchedList } from "./WatchedList";
import { MovieInList } from "./MovieInList";
import { tempWatchedData } from "./tempWatchedData";
import { tempMovieData } from "./tempMovieData";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  console.log(movies);
  return (
    <>
      <Navbar>
        <Search />
        <NavbarResults movies={movies} />
      </Navbar>
      <Main>
        <MovieList>
          <MovieInList movies={movies} />
        </MovieList>
        <WatchedList />
      </Main>
    </>
  );
}
