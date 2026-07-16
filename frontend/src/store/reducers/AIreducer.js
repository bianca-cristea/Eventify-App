const initialState = {
  messages: [],
  loading: false,
};

export const aiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AI_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "AI_SUCCESS":
      return {
        loading: false,
        messages: [...state.messages, action.payload],
      };

    case "AI_CLEAR":
      return initialState;

    default:
      return state;
  }
};
