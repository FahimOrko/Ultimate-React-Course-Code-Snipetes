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
