## useReducer Hook

The `useReducer` hook is useful for managing complex state logic in React applications. It helps organize state updates into a predictable flow using actions and a reducer function. Unlike `useState`, which is ideal for simple state management, `useReducer` is better suited for handling multiple related state transitions.

#### A more smaller example

```jsx
const initialState = {
  user: null,
  isAuthed: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthed: true };

    case "logout":
      return { ...state, user: null, isAuthed: false };

    default:
      throw new Error("Unknow Action");
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthed } = state;
};
```

#### Here is how you can use it

```jsx
dispatch({ type: "login", payload: { email, password } });
```

### How to Use (More informative)

- Import `useReducer` from React.
- Define the initial state object.
- Create a reducer function that handles different state transitions.
- Use the `useReducer` hook inside a component to manage state.
- Dispatch actions to update state based on user interactions.

```

```
