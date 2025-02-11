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
