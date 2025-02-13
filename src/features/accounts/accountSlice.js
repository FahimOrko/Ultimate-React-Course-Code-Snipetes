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
    // if you have two parametes that you pass in when calling the dispatch fuction
    // you need to handle it like this
    // bcz default actions that redux toolkit creates can only have one single value
    // so the action.payload can only have a single value
    // so you need to use the prepare fcution and call the reducer hook to access two values
    // otherwise tou can also send a object containg two values in the payload
    // that will also work with the normal actions
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

// console.log(accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

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

export default accountSlice.reducer;

// // accountReducer function to handle actions
// const accountReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };

//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };

//     case "account/requestLoan":
//       if (state.loan > 0) return state; // Prevent multiple loans
//       return {
//         ...state,
//         loan: action.payload.amount,
//         balance: state.balance + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };

//     case "account/payLoan":
//       if (state.balance < state.loan) return state;
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };

//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// };

// // Action creators
// export const deposit = (amount, currency) => {
//   if (currency === "USD")
//     return {
//       type: "account/deposit",
//       payload: amount,
//     };

//   return async (dispatch, getState) => {
//     dispatch({ type: "account/convertingCurrency" });
//     // Api call
//     // retrun action
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;
//     // console.log(converted);
//     dispatch({
//       type: "account/deposit",
//       payload: converted,
//     });
//   };
// };

// export const withdraw = (amount) => ({
//   type: "account/withdraw",
//   payload: amount,
// });
// export const requestLoan = (amount, purpose) => ({
//   type: "account/requestLoan",
//   payload: { amount, purpose },
// });
// export const payLoan = () => ({
//   type: "account/payLoan",
// });

// export default accountReducer;
