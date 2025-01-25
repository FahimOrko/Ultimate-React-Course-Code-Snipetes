### Componet compostion

Can be used to to solve prop driling probs
the basic idea is to pass down children insted of props
Some thing liuke this

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

### Passing Elemenet as children isntaed of props

You can put jsx in side of prop and pass it and use it in the other jsx code as you seem fit
This works same way you would handle a prop
Mainly used in react router

      <MovieList element={<MovieInList movies={movies} />} />
