## Redux Toolkit

### Introduction

Redux Toolkit is the official, recommended approach for writing Redux logic. It provides a set of tools that simplify Redux development by reducing boilerplate code and offering good defaults for store setup and state management.

### Redux Toolkit Store Setup

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
