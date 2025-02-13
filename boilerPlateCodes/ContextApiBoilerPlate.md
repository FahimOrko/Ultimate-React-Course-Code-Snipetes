## Using Context API

The Context API provides a way to share data across the component tree without having to pass props manually at every level. Below is a clean and structured guide on how to create, use, and wrap the Context API around the main app.

#### 1. Creating a Context and Provider

The `CitiesProvider` component fetches city data from a local server and provides it through context. Components can consume this context to access city data and loading state.

```jsx
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
};

// Custom Hook to Use Context
export const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};
```

#### 2. Example: Authentication Context

This is another example of how to create an authentication context.

```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ name: username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for using Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
```

#### 3. Wrapping Context Around the Main App

To use context across the entire application, wrap the provider around the app in `index.js` or `App.js`.

##### Example

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CitiesProvider>
        <App />
      </CitiesProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### 4. Using Context in a Component

Once the provider is wrapped around the app, you can access the context values in any child component.

##### Example

```jsx
import React from "react";
import { useCities } from "../context/CitiesContext";

const CitiesList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <p>Loading cities...</p>;

  return (
    <ul>
      {cities.map((city) => (
        <li key={city.id}>{city.name}</li>
      ))}
    </ul>
  );
};

export default CitiesList;
```

##### Example

```jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login("JohnDoe")}>Login</button>
      )}
    </div>
  );
};

export default UserProfile;
```

### Final Thoughts

- Context API is useful for global state management, reducing the need for prop drilling.
- Use createContext and useContext for clean and efficient access to state.
- Wrap providers around the main app to make the context accessible everywhere.
- Use custom hooks (useCities, useAuth) to encapsulate logic and avoid context misuse.
