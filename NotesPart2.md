# React Best Practices and Concepts

## Component Composition

Component composition helps solve prop drilling issues by passing down children instead of props.
Here's an example:

```jsx
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

## Passing Elements as Children Instead of Props

You can pass JSX inside a prop and use it elsewhere, similar to handling a prop. This is commonly used in React Router.

```jsx
<MovieList element={<MovieInList movies={movies} />} />
```

## Prop Types for Error Prevention

To avoid prop-related errors, define prop types for components (similar to TypeScript).

First, import `PropTypes`:

```jsx
import PropTypes from "prop-types";

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  defaultRating: PropTypes.number,
  messages: PropTypes.array,
};
```

## Differences Between Component, Component Instances, and React Elements

1. **Component**: A function that returns JSX.
2. **Component Instance**: When the component is used (`<Tab />`).
3. **React Element**: The result of using a component, which gets converted into a DOM element.

## React Fiber and Reconciliation

1. React's reconciler is called **Fiber Tree**, structured like a linked list.
2. **ReactDOM** commits updates during the commit phase.

### React Work Process:

1. Trigger an update
2. Create new React elements
3. Generate a new Virtual DOM
4. Reconcile differences with the current Fiber tree
5. Update the Fiber tree
6. Create a list of DOM updates
7. Commit phase: Update DOM and UI on screen

## Using Keys in React Lists

1. Always use **unique keys** to prevent unnecessary re-renders.
2. If a component instance remains the same but needs a state reset, use a different key.

## Using `useEffect`

### Running After Every Render

```jsx
useEffect(() => {
  console.log("After every render");
});
```

### Running Only Once After Initial Render

```jsx
useEffect(() => {
  console.log("On initial mount");
}, []);
```

### Running When Dependencies Change

```jsx
useEffect(() => {
  console.log("Runs when query or title changes");
}, [query, title]);
```

### Example: Fetching Data With `useEffect`

```jsx
useEffect(() => {
  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(fetchLink + query.toLowerCase());

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      if (data.Response === "False") throw new Error("Movie not found");

      setMovies(data.Search);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  fetchMovies();
}, [query]);
```

## Cleanup Functions in `useEffect`

Used to **revert changes** made to the outside world (e.g., event listeners, subscriptions).

### Example: Updating Document Title

```jsx
useEffect(() => {
  if (!title) return;
  document.title = "Movies | " + title;

  return () => {
    document.title = "Movie Reviews";
  };
}, [title]);
```

### Example: Event Listener Cleanup

```jsx
useEffect(() => {
  const callback = (e) => {
    if (e.code === "Escape") {
      setSelectedId(null);
    }
  };

  document.addEventListener("keydown", callback);

  return () => {
    document.removeEventListener("keydown", callback);
  };
}, [setSelectedId]);
```

## AbortController for Fetch Cleanup

To prevent multiple unnecessary API calls when typing in a search bar:

```jsx
useEffect(() => {
  const controller = new AbortController();
  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(fetchLink + "&s=" + query, {
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      if (data.Response === "False") throw new Error("Movie not found");

      setMovies(data.Search);
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
    return;
  }

  fetchMovies();
  return () => controller.abort();
}, [query]);
```

## Cleanup after setting a timer

```jsx
export const Timer = ({ dispatch, secRemaining }) => {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return <div className="timer">{secRemaining}</div>;
};
```

## Local Storage in React

### Retrieving from Local Storage

```jsx
const [watched, setWatched] = useState(() => {
  const storedVal = localStorage.getItem("watched");
  return JSON.parse(storedVal) || [];
});
```

### Storing in Local Storage

```jsx
useEffect(() => {
  localStorage.setItem("watched", JSON.stringify(watched));
}, [watched]);
```

## Using `useRef`

### Example: Storing a DOM Reference

```jsx
export const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") inputEl.current.focus();
      setQuery("");
    };

    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
```

## Custom Hooks

Custom hooks are created to encapsulate reusable logic, similar to components. However, instead of using props, you pass objects or values to a function. This approach helps keep your code clean and modular.

### Example: useLocalStorage Hook

The following custom hook, `useLocalStorage`, manages state while syncing it with `localStorage`:

```javascript
import { useEffect, useState } from "react";

export const useLocalStorage = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const storedVal = localStorage.getItem(key);
    return storedVal ? JSON.parse(storedVal) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
```

### Example: useGeolocation Hook

Gets the lat and lng of the user

```javascript
import { useState } from "react";

export const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
};
```
