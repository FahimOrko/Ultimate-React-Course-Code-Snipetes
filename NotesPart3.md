# React Best Practices and Concepts

---

## useReducer Hook

The `useReducer` hook is useful for managing complex state logic in React applications. It helps organize state updates into a predictable flow using actions and a reducer function. Unlike `useState`, which is ideal for simple state management, `useReducer` is better suited for handling multiple related state transitions.

### Example: Managing Quiz State with useReducer

```javascript
import { useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading", // Possible values: loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };

    case "dataFailed":
      return { ...state, status: "error" };

    case "dataLoading":
      return { ...state, status: "loading" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions[state.index];
      const updatedPoints =
        question.correctOption === action.payload
          ? state.points + question.points
          : state.points;
      return { ...state, answer: action.payload, points: updatedPoints };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      const newHighscore =
        state.points > state.highscore ? state.points : state.highscore;
      return {
        ...state,
        status: "finished",
        index: 0,
        highscore: newHighscore,
      };

    case "restart":
      return { ...state, points: 0, index: 0, answer: null, status: "ready" };

    default:
      throw new Error("Unknown action type");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highscore } = state;
};
```

### How to Use

- Import `useReducer` from React.
- Define the initial state object.
- Create a reducer function that handles different state transitions.
- Use the `useReducer` hook inside a component to manage state.
- Dispatch actions to update state based on user interactions.

---

## Setting up ESLint in a Vite Project

ESLint is a popular tool for identifying and fixing problems in JavaScript code. It helps enforce best practices and maintain code quality.

### Installation

Run the following command to install ESLint in a Vite project:

```console
npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev
```

### Configuration

Update the `vite.config.js` file to include ESLint as a plugin:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugins-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
```

Create an `.eslintrc.json` file with the following content:

```javascript
{
  "extends": "react-app"
}
```

### How to Use

- Install ESLint and its dependencies.
- Configure Vite to use ESLint.
- Create an `.eslintrc.json` file to define linting rules.
- Run ESLint to analyze and fix code issues.

---

## Installing React Router

React Router is a library that enables routing in React applications, allowing navigation between different pages without reloading the browser.

### Installation

```console
$ npm i react-router-dom
```

### How to Use

- Install `react-router-dom` using npm.
- Import necessary components like `BrowserRouter`, `Routes`, and `Route`.
- Define different routes and associate them with corresponding components.

---

## React Router Setup

React Router enables navigation between different views in a React application. Below is a basic setup demonstrating how to define routes and navigate between them.

### Example: Basic Routing

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage";
import { PricingPage } from "./pages/PricingPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="product" element={<ProductsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

### How to Use

- Wrap your application with `BrowserRouter`.
- Use `Routes` to define all route mappings.
- Assign `Route` components with `path` and corresponding page components.
- Use `Link` from `react-router-dom` to create navigation links.

---

## Nested Routes in React Router

Nested routes allow you to define routes within a parent component, enabling better organization and modularity.

### Example: Defining Nested Routes

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./pages/AppLayout";
import { NotFoundPage } from "./pages/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>Hello from index</p>} />
          <Route path="cities" element={<p>Hello from cities</p>} />
          <Route path="countries" element={<p>Hello from countries</p>} />
          <Route path="form" element={<p>Hello from form</p>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

### How to Use

- Define a parent route using `Route`.
- Use `<Outlet />` inside the parent component to render nested routes.
- Nested routes will be displayed inside the parent component when their path is matched.

This structure improves code organization and allows dynamic rendering of different sections within a shared layout.

```jsx
// import React from "react";
import { Outlet } from "react-router-dom";
import { AppNav } from "./AppNav";
import { Footer } from "./Footer";
import Logo from "./Logo";

import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
};
```

---

## Using URL Parameters and Query Strings in React Router

When building a React application with `react-router-dom`, handling dynamic routes and passing parameters via URL is a common requirement. This guide will cover how to:

- Use dynamic route parameters with the `useParams` hook
- Pass query strings to links
- Retrieve and manipulate query parameters using `useSearchParams`

### Setting Up Dynamic Routes with `useParams`

First, define a dynamic route in `react-router-dom` where `:id` represents the city identifier:

```jsx
<Route path="cities/:id" element={<City />} />
```

To link to this route dynamically, set up a link component:

```jsx
<Link className={styles.cityItem} to={`${id}`}>
  <span className={styles.emoji}>{emoji}</span>
  <h3 className={styles.name}>{cityName}</h3>
  <time className={styles.date}>{formatDate(date)}</time>
  <button className={styles.deleteBtn}>x</button>
</Link>
```

To retrieve the `id` from the URL inside the `City` component, use the `useParams` hook:

```jsx
import { useParams } from "react-router-dom";

const { id } = useParams();
```

### Adding Query Strings to Links

To pass additional information (such as latitude and longitude) through query parameters, modify the link as follows:

```jsx
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export const CityItem = ({ city }) => {
  const { cityName, emoji, date, id, position } = city;
  const { lat, lng } = position;

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>x</button>
      </Link>
    </li>
  );
};
```

### Accessing Query Parameters with `useSearchParams`

To extract and manipulate query parameters inside a component, use the `useSearchParams` hook:

```jsx
import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

export const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>
        Latitude: {lat}, Longitude: {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
        Change Position
      </button>
    </div>
  );
};
```

### Modifying Query Parameters Globally

You can dynamically update the query parameters using `setSearchParams`, which is useful for filters, pagination, or interactive UI elements:

```jsx
setSearchParams({ lat: newLat, lng: newLng });
```

This approach ensures a seamless and maintainable way to handle dynamic routes and parameters in React applications using `react-router-dom`. 🚀

---

## Using the `useNavigate` Hook

The `useNavigate` hook in `react-router-dom` enables programmatic navigation within your React application.

### Navigating to a Different Route

To navigate to another route, such as a form page, use `useNavigate` as follows:

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

<div
  className={styles.mapContainer}
  onClick={() => {
    navigate("form");
  }}
>
  <h1>
    {lat} {lng}
  </h1>
  <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
    Change Position
  </button>
</div>;
```

### Navigating Backward

To navigate back one or more steps in the history stack, use:

```jsx
<Button
  type="back"
  onClick={(e) => {
    e.preventDefault();
    navigate(-1);
  }}
>
  &larr; Back
</Button>
```

---

## Using `Navigate` for Redirection

The `<Navigate>` component allows you to programmatically redirect users. This is particularly useful in nested routes where you want to automatically redirect to a sub-route instead of duplicating components.

For instance, if the home page and another route share the same layout, you can redirect users efficiently:

```jsx
// Redirecting to "cities" when accessing the "app" route
<Route index element={<Navigate replace to="cities" />} />
```

### Example: Implementing Navigation with React Router

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="pricing" element={<Pricing />} />
    <Route path="products" element={<Product />} />
    <Route path="login" element={<Login />} />
    <Route path="app" element={<AppLayout />}>
      <Route index element={<Navigate replace to="cities" />} />
      <Route
        path="cities"
        element={<CityList cities={cities} isLoading={isLoading} />}
      />
      <Route path="cities/:id" element={<City />} />
      <Route
        path="countries"
        element={<CountryList cities={cities} isLoading={isLoading} />}
      />
      <Route path="form" element={<Form />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</BrowserRouter>;
```

Using `replace` in `<Navigate replace to="cities" />` ensures that users cannot navigate back to the original URL before redirection, improving navigation control in single-page applications.

---

## Context API

This demonstrates how to set up and use the Context API in React to manage and share state across components. The example provided showcases a blog post application where posts, search queries, and UI state are shared using `PostContext`.

### Setting Up Context API

First, create the context:

```jsx
const PostContext = createContext();
```

Next, wrap the return JSX with `<PostContext.Provider>` and pass the necessary state and functions as context values.

```jsx
const PostContext = createContext();

function App() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Derived state for filtering posts
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  useEffect(() => {
    document.documentElement.classList.toggle("fake-dark-mode");
  }, [isFakeDark]);

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      <section>
        <button
          onClick={() => setIsFakeDark((prev) => !prev)}
          className="btn-fake-dark-mode"
        >
          {isFakeDark ? "☀️" : "🌙"}
        </button>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </section>
    </PostContext.Provider>
  );
}
```

### Consuming Context Values

To access the provided context values, use `useContext` within a component.

```jsx
function Header() {
  const { onClearPosts } = useContext(PostContext);

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}
```

---

## Custom Context Hook Boilerplate

This section provides a boilerplate for setting up a custom context hook in React to manage city-related state globally. The `CitiesContext` allows components to access and update city data easily without prop drilling.

### Creating the Context and Provider

The `CitiesProvider` component fetches city data from a local server and provides it through context. Components can consume this context to access city data and loading state.

```jsx
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
```

### Another Context API bioler plate

```jsx
import { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context was used outside the Provider");
};

export { AuthProvider, useAuth };
```

### Creating a Custom Hook

The useCities hook simplifies consuming the context and ensures it is used within a valid provider.

```jsx
const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext is used outside provider");
  return context;
};

export { CitiesProvider, useCities };
```

---

## State Placement Options

### Understanding Different State Management Approaches

Below are various methods for managing state in a React application:

1. **Local state** - `useState`, `useReducer`, `useRef`
2. **Lifting state up** - `useState`, `useReducer`, `useRef`
3. **Global state** - Context API + `useState` / `useReducer` (UI state)
4. **Global state** - Redux, React Query (TanStack), Zustand (Remote / UI)
5. **Global state, Passing between routes** - React Router
6. **Storing data in the browser** - Local storage, session storage

![State Placement](./public/Section-03/image-2.png)

---

## State Management Tool Options

### Choosing the Right State Management Tool

Various tools are available for managing state effectively, depending on the complexity and scale of the application.

![State Management Tools](./public/Section-03/image.png)

---

## Using Leaflet.js

Leaflet.js is a JavaScript library for interactive maps. This section demonstrates how to integrate it with React using `react-leaflet`.

To use Leaflet.js, install the required npm packages:

```sh
npm i react-leaflet leaflet
```

### Boilerplate Code

Below is a basic example of rendering a map with markers for different cities.

```jsx
<MapContainer
  center={mapPosition}
  zoom={13}
  scrollWheelZoom={true}
  className={styles.map}
>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  />
  {cities.map((city) => (
    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span>
        <span>{city.cityName}</span>
      </Popup>
    </Marker>
  ))}
</MapContainer>
```

---

## Other Ways to Use `useEffect`

### Redirecting Based on Conditions

One of the common uses of the `useEffect` hook is handling redirects when certain conditions are met. The `useNavigate` hook from React Router can be used as shown below:

```jsx
const navigate = useNavigate();
useEffect(() => {
  if (isAuthed) navigate("/app", { replace: true });
}, [isAuthed, navigate]);
```

- The `replace: true` option ensures that when the user clicks the back button, they don't return to the redirected page but instead go back two steps in the history stack.

---

## Common Practice for Protecting Routes

### Creating a Protected Route Component

A common approach to protecting routes in a React app is to create a wrapper component that checks authentication status and redirects users if they are not authorized.

```jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }) => {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed) navigate("/");
  }, [isAuthed, navigate]);

  return children;
};

export default ProtectedRoutes;
```

- This component only renders `children` if the user is authenticated.
- If the user is not authenticated, they are redirected to the homepage (`/`).

### Setting Up Protected Routes

Once the `ProtectedRoutes` component is created, wrap the routes that require authentication inside it.

```jsx
const App = () => {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="products" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
};
```

- The `ProtectedRoutes` wrapper ensures that only authenticated users can access the `/app` routes.
- If an unauthenticated user tries to access these pages, they will be redirected to `/`.

This setup provides a simple and effective way to manage protected routes in a React application.

---

## Performance Optimization Tools

Efficient performance optimization is crucial for React applications to prevent unnecessary re-renders and enhance user experience. The image below highlights key tools and techniques for optimizing React performance, such as memoization, lazy loading, and batching updates.

![alt text](./public/Section-03/image-1.png)

---

## Components Re-render Cases

Understanding when and why components re-render is essential for optimizing performance. This section visually represents different cases that trigger re-renders in React, such as state updates, prop changes, and parent re-renders.

![alt text](./public/Section-03/image-4.png)

---

## Memoization

Memoization helps store and reuse previous computations, preventing expensive recalculations and unnecessary re-renders. The images below illustrate how memoization works in React and when to use techniques like `memo`, `useMemo`, and `useCallback` for optimizing performance.

![alt text](./public/Section-03/image-5.png)

![alt text](./public/Section-03/image-6.png)

---

## Using Memo

### Optimizing Component Rendering with `memo`

`memo` is a higher-order component that optimizes functional components by preventing unnecessary re-renders when props remain the same.

#### Example

```jsx
const Archive = memo(({ show }) => {
  // Using state to store posts, ensuring posts are generated only once at initial render.
  const [posts] = useState(() =>
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(show);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
});
```

---

## Issues Using `memo`

While `memo` helps optimize performance, it has some drawbacks, such as unnecessary re-renders due to reference changes in objects or functions passed as props.

![alt text](./public/Section-03/image-7.png)

---

## Solution to `memo` Issues

Using `useMemo` and `useCallback` can help prevent unnecessary re-renders caused by changing object references or functions.

![alt text](./public/Section-03/image-8.png)

---

## Three Key Use Cases for `useMemo` and `useCallback`

These hooks are commonly used to optimize component performance by avoiding expensive recalculations or function re-creations.

![alt text](./public/Section-03/image-9.png)

---

## Using `useMemo` Hook

`useMemo` is used to memoize values, preventing re-computation when dependencies haven't changed. This is especially useful when passing objects as props, as `memo` alone won't prevent unnecessary re-renders.

#### Example

```jsx
const archiveOptions = useMemo(() => {
  return {
    show: false,
    title: "Hello World",
  };
}, []);
```

---

### Optimized Component with `useMemo`

```jsx
const Archive = memo(({ archiveOptions }) => {
  const { show, title } = archiveOptions;

  const [posts] = useState(() =>
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(show);

  return (
    <aside>
      <h2>{title}</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
});
```

---

## `useCallback` Hook

`useCallback` is used to memoize functions, preventing their re-creation on every render. This is useful when passing functions as props to `memoized` components.

#### Example

```jsx
const handleAddPost = useCallback((post) => {
  setPosts((posts) => [post, ...posts]);
}, []);
```

---

## Lazy loading

Lazy loading is a performance optimization technique that helps reduce the initial load time of a React application. Instead of loading all components and pages at once, lazy loading ensures that only the necessary parts of the app are loaded when needed. This significantly improves the user experience, especially for large applications.

#### Optimizing bundle size by code spliting

Code splitting helps optimize the application's JavaScript bundle size by splitting it into smaller, more manageable chunks. This reduces the amount of JavaScript that needs to be loaded upfront, improving page load times.

![alt text](./public/Section-03/image10.png)

#### Lazy loader pages

React provides the `lazy` function to dynamically import components only when they are needed. To handle loading states while waiting for the component to load, React’s `Suspense` component is used with a `fallback` prop, where you can display a loading spinner or message.

#### Code Example

```jsx
const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="products" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
};
```

## Optimization DOs amd DONts

![alt text](./public/Section-03/image11.png)

---

## `useEffect` Dependecy Array rules

![alt text](./public/Section-03/image12.png)

### How to handle uncessary depndencies

![alt text](./public/Section-03/image14.png)

---

## Redux

![alt text](./public/Section-03/image21.png)

#### Mechanism of Redux

![alt text](./public/Section-03/image-22.png)

---

## First look at redux code example

```jsx
import { createStore } from "redux";

const initailSatte = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const reducer = (state = initailSatte, action) => {
  switch (action.type) {
    case "accont/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "accont/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "accont/reqLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "accont/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

// store.dispatch({
//   type: "accont/reqLoan",
//   payload: {
//     amount: 500,
//     purpose: "buy a car",
//   },
// });

// console.log(store.getState());

const deposit = (amount) => {
  return { type: "accont/deposit", payload: amount };
};

const withdraw = (amount) => {
  return { type: "accont/withdraw", payload: amount };
};

const reqLoan = (amount, purpose) => {
  return { type: "accont/reqLoan", payload: { amount, purpose } };
};

const payLoan = (amount) => {
  return { type: "accont/payLoan", payload: amount };
};

store.dispatch(deposit(500));

console.log(store.getState());

store.dispatch(withdraw(300));

console.log(store.getState());

store.dispatch(reqLoan(300, "Buy a car"));

console.log(store.getState());

store.dispatch(payLoan(300));

console.log(store.getState());
```

---

## When you have more than one reducer

#### Code example (Should never be like this in real world though )

```jsx
import { combineReducers, createStore } from "redux";

// Initial state of the store
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nid: "",
  createdAt: "",
};

// accountReducer function to handle actions
const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state; // Prevent multiple loans
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - action.payload,
      };

    default:
      return state;
  }
};

// customerReducer function to handle actions

const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nid: action.payload.nid,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
};

// Create Redux store
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// Action creators
const deposit = (amount) => ({ type: "account/deposit", payload: amount });
const withdraw = (amount) => ({ type: "account/withdraw", payload: amount });
const requestLoan = (amount, purpose) => ({
  type: "account/requestLoan",
  payload: { amount, purpose },
});
const payLoan = (amount) => ({ type: "account/payLoan", payload: amount });

// Dispatch actions and log state
store.dispatch(deposit(500));
console.log("After deposit:", store.getState());

store.dispatch(withdraw(300));
console.log("After withdrawal:", store.getState());

store.dispatch(requestLoan(300, "Buy a car"));
console.log("After requesting loan:", store.getState());

store.dispatch(payLoan(300));
console.log("After paying loan:", store.getState());

// Customer action creators

const createCustomer = (fullName, nid) => {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nid, createdAt: new Date().toDateString() },
  };
};

const updateName = (fullName) => {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
};

// Dispatch actions customer and log state
store.dispatch(createCustomer("Fahim Orko", 1234));
console.log("After customer created:", store.getState());

store.dispatch(updateName("Fahim"));
console.log("After customer updated:", store.getState());
```

#### Correct way to do this

You should have your two reducers in diffrent files and import and use them in the store js file

like this

#### Code Example

```jsx
import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Create Redux store
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;

// console.log(store.getState());
```

## How to use the store in componets

Here is how you can access store values

```jsx
const customer = useSelector((store) => store.customer);
```

Here is how you can access dispatch fuctions

```jsx
const dispatch = useDispatch();

function handleClick() {
  dispatch(createCustomer("John Doe", 1234));
}
```

---

## Redux Thunks

![alt text](./public/Section-03/image-23.png)

---

## Thunk useage

After you improt thunk you can use api calls like this

```jsx
// Action creators
export const deposit = (amount, currency) => {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };

  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });
    // Api call
    // retrun action
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    // console.log(converted);
    dispatch({
      type: "account/deposit",
      payload: converted,
    });
  };
};
```

---

## Installing redux dev tools

```sh
$ npm i redux-devtools-extension
```

How to use this -

```javascript
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// Create Redux store
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

// console.log(store.getState());
```

---

## Redux Toolkit

### Introduction

Redux Toolkit is the official, recommended approach for writing Redux logic. It provides a set of tools that simplify Redux development by reducing boilerplate code and offering good defaults for store setup and state management.

### Redux Toolkit Store Setup

#### Overview

This setup defines the Redux store using Redux Toolkit's `configureStore` method. It combines multiple slices (reducers) into a single store, allowing for centralized state management in a React application.

#### Installation

Ensure you have Redux Toolkit installed:

```sh
npm install @reduxjs/toolkit
```

#### Store Configuration

```javascript
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;

// console.log(store.getState());
```

#### Explanation

1. **`configureStore`**: A function from Redux Toolkit that simplifies store creation by automatically setting up the Redux DevTools extension and middleware.
2. **Reducers**:
   - `accountReducer` manages the state related to user accounts (e.g., balance, transactions).
   - `customerReducer` handles customer-related state (e.g., customer details).
3. **Store Export**: The store is exported to be used in the application, typically in the main `index.js` or `App.js` file.
4. **`console.log(store.getState())`**: This can be used for debugging to check the initial state of the store.

#### Example: Account Slice

This example defines a Redux slice for managing account-related state.

```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    // If you need to pass two parameters when dispatching an action,
    // you must handle it carefully because Redux Toolkit's default actions
    // only accept a single value as action.payload.
    // To work around this, you can use the `prepare` function,
    // which allows you to structure the payload properly.
    // Alternatively, you can pass an object containing both values in the payload,
    // which will also work with standard actions.

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      if (state.balance < state.loan) return;
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export const deposit = (amount, currency) => {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };

  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({
      type: "account/deposit",
      payload: converted,
    });
  };
};

export default accountSlice.reducer;
```

#### Example: Customer Slice

This example defines a Redux slice for managing customer-related state.

```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nid: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer(state, action) {
      state.fullName = action.payload["fullName"];
      state.nid = action.payload["nationalId"];
      state.createdAt = new Date().toDateString();
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
```

#### How to use them in componets

```jsx
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw } from "../features/accounts/accountSlice";
import { createCustomer } from "../features/customers/customerSlice";

// Using Redux State in Components
// useSelector is used to access the Redux state
const balance = useSelector((state) => state.account.balance);
const fullName = useSelector((state) => state.customer.fullName);

// Dispatching Actions in Components
// useDispatch is used to send actions to the Redux store
const dispatch = useDispatch();
dispatch(deposit(100)); // Depositing money
dispatch(withdraw(50)); // Withdrawing money
dispatch(createCustomer({ fullName: "John Doe", nationalId: "123456789" })); // Creating a customer

// Explanation:
// 1. useSelector is used to retrieve specific pieces of state from the Redux store.
// 2. useDispatch is used to dispatch actions that modify the state.
// 3. Actions like deposit, withdraw, and createCustomer modify the respective slices of the state.
```

### Conclusion

Redux Toolkit simplifies state management in React applications by reducing boilerplate and providing a structured way to handle actions and reducers. This guide covers basic store setup and examples for managing accounts and customers using Redux Toolkit.

---
