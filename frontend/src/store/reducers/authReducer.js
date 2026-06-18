const initialState = {
  user: null,
  address: [],
  clientSecret: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "USER_ADDRESS":
      return { ...state, address: action.payload };
    case "SELECT_CHECKOUT_ADDRESS":
      return { ...state, selectedUserCheckoutAddress: action.payload };
    case "FETCH_PROFILE":
      return { ...state, profile: action.payload };
    case "REMOVE_CHECKOUT_ADDRESS":
      return { ...state, selectedUserCheckoutAddress: null };
    case "CLIENT_SECRET":
      return { ...state, clientSecret: action.payload };
    case "REMOVE_CLIENT_SECRET":
      return {
        ...state,
        clientSecret: null,
      };
    case "LOG_OUT":
      return {
        user: null,
        address: null,
      };

    default:
      return state;
  }
};
