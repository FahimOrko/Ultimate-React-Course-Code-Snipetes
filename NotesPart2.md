### Componet compostion

Can be used to to solve prop driling probs
the basic idea is to pass down children insted of props
Some thing liuke this

```
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
```

### Passing Elemenet as children isntaed of props

You can put jsx in side of prop and pass it and use it in the other jsx code as you seem fit
This works same way you would handle a prop
Mainly used in react router

```
    <MovieList element={<MovieInList movies={movies} />} />

```

### Set prop types so you dont get prop errors

So basically this is simmilar to what TS does, you set the prop type for the props of the componets, here is a expample of how you can do it in JSX

first improt Proptype

```
    import PropTypes from "prop-types";

    StarRaiting.prototype = {
      maxRating: PropTypes.number,
      color: PropTypes.string,
      size: PropTypes.number,
      defaultRating: PropTypes.number,
      masssages: PropTypes.array,
    };
```

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

### Useing useEffect

1. So this useEffect code gets run after each render, so if one state in the code gets changes a render happens and this will get runed then

```
  useEffect(() => {
    console.log("after every render");
  });
```

2. This code get ran on the inital render well after the intial render only once as there is nothing dependecy array

```
  useEffect(() => {
    console.log("On intial mount");
  }, []);
```

3. This code gets runed on each time an item on the dependcy array gets cahges, these are usally states adn can be any otehr thing. Mainly the things that causes as rerender are here and based on that the code gets ran.

```
  useEffect(() => {
    console.log("after on the the intems from depnedency array get changed");
  }, [queery, titile]);
```

4. Some code snippets of useEffect in actaul program

```
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchLink = `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(fetchLink + query.toLowerCase());

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
  }, [query, fetchLink]);
```

### Cleanup Fuction

Basically in use effect fuction we make changes to the outside world
And when the changes are made and we want to go back to the prev state we use cleanup fuction
its basically a fuction you return in use effect hook
example below

```

  useEffect(() => {
    if (!title) return;
    document.title = "Movies | " + title;

    return () => {
      document.title = "Movie Reviews";
    };
  }, [title]);


```

another exp of cleanup fuction

```
  useEffect(() => {
    const callBack = (e) => {
      if (e.code === "Escape") {
        setSelectedId(null);
      }
    };

    document.addEventListener("keydown", callBack);

    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [setSelectedId]);

```

### AbortController - cleanup Fuction

Another Cleanup fuction is AbortController, basically when you make a fetch request and with each new key a new req is made, like when you search something in say a serch bar and
a new req is made with ecry key stokle its best practice to shut down the previous fetch reqs and here you can use AbortController for that

```

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

    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);


```
