# React Best Practices and Concepts

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
