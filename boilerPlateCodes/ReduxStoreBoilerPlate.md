## Redux Store Boilerplate

This is a basic implementation of Redux store management in JavaScript. It demonstrates how to manage account transactions, including deposits, withdrawals, and loans.

---

### 📦 Installation

Before using this Redux setup, ensure you have installed the necessary package:

```sh
npm install redux react-redux
```

---

### Setting Up the Redux Store

The Redux store combines multiple reducers to manage different slices of state.

#### Creating the Main Store

The store is created using combineReducers and createStore, allowing us to manage multiple slices of state (e.g., accounts and customers).

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

---

#### Creating a Reducer

Each reducer manages a part of the application state. Below is an example reducer for handling account-related logic, including deposits, withdrawals, and loans.

```jsx
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
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

// Action creators
export const deposit = (amount) => ({
  type: "account/deposit",
  payload: amount,
});
export const withdraw = (amount) => ({
  type: "account/withdraw",
  payload: amount,
});
export const requestLoan = (amount, purpose) => ({
  type: "account/requestLoan",
  payload: { amount, purpose },
});
export const payLoan = (amount) => ({
  type: "account/payLoan",
  payload: amount,
});

export default accountReducer;
```

---

#### Using Redux in Components

Once the Redux store is set up, wrap your application with the Provider from react-redux to make the store accessible in components.

##### Wrapping the App with the Redux Provider

```javascript
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

<Provider store={store}>
  <App />
</Provider>;
```

##### Accessing Redux State in Components

Use `useDispatch` to dispatch actions and `useSelector` to access the Redux store.

```jsx
const dispatch = useDispatch();
const account = useSelector((store) => store.account);
const { balance, loan, loanPurpose: loanReason } = account;
```

---

### 📝 Explanation

- State Management: The initialState holds account balance, loan amount, and loan purpose.
- Reducer: Handles different actions (deposit, withdraw, requestLoan, and payLoan).
- Redux Store: Created using createStore(), which takes the reducer as an argument.
- Action Creators: Functions that return action objects to dispatch state updates.
- Dispatching Actions: Simulates transactions and logs the updated state.
