# React Best Practices and Concepts

## useReducer Hook

The `useReducer` hook is useful for managing complex state logic in React applications. It helps organize state updates into a predictable flow using actions and a reducer function.

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

## Set up eslint in vite project

```console
npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev
```

vite.config.js file -

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugins-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
```

.eslintrc.json file -

```javascript
{
  "extends": "react-app"
}
```

## Istalling react router

```console
$ npm i react-router-dom
```

## React Router

Here you can see how the routing works, simply set the path in path and then call the page componet in elemenet

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

and here is how yo set the links to the page -

```jsx
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
      </ul>
    </nav>
  );
};
```
