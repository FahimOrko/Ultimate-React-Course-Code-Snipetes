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

### Set prop types so you dont get prop errors

So basically this is simmilar to what TS does, you set the prop type for the props of the componets, here is a expample of how you can do it in JSX

first improt Proptype

    import PropTypes from "prop-types";

    StarRaiting.prototype = {
      maxRating: PropTypes.number,
      color: PropTypes.string,
      size: PropTypes.number,
      defaultRating: PropTypes.number,
      masssages: PropTypes.array,
    };

### Diff between componenet , componenet instances, react element

1. Component is the fuction where the jsx code is
2. Componenet instance is , where the compoent is called like , < Tab / >
3. React Element is basically the result of using a comonent in the code, - > this gets converted to dom elemenet

### Reconciler of React is called Fiber tree

1. the fiber tree is like a linked list

### ReactDom does the commit on the commit phase

### React work tree

trigger -> update reat elems -> new virtual dom -> Reconsile diff with curr fiber tree -> Update fiber tree -> List of dom updates -> Commit pahse -> Update dom -> Update UI on screen

### Using key in react instances

1. You should always use unique keys if you dont want to update an elemeent on rerender when the elem is the same as prev one. Mainoly for time compelxity, Thats why there should be a unzie key always when you llop ovwer a list and each item should have uniue key
2. Howver on the other hand you if a componet instance is the same and eveyhtingis same, but lets says props are diffrent and you need to update the state, you can send in a diffrent key and when react renders the page it will reset the state.
