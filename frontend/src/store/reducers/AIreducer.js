const initialState = {
  messages: JSON.parse(localStorage.getItem("aiMessages")) || [],
  loading: false,
};

export const aiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AI_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "AI_SUCCESS": {
      const updatedMessages = [...state.messages, action.payload];

      localStorage.setItem("aiMessages", JSON.stringify(updatedMessages));

      return {
        loading: false,
        messages: updatedMessages,
      };
    }

    case "AI_CLEAR":
      localStorage.removeItem("aiMessages");

      return {
        ...state,
        messages: [],
        loading: false,
      };

    default:
      return state;
  }
};
