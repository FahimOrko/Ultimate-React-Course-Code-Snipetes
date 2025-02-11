const initialStateCustomer = {
  fullName: "",
  nid: "",
  createdAt: "",
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

// Customer action creators

export const createCustomer = (fullName, nid) => {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nid, createdAt: new Date().toDateString() },
  };
};

export const updateName = (fullName) => {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
};

export default customerReducer;
