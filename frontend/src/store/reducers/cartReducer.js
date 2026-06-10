const initialState = {
  cart: [],
  totalPrice: 0,
  cartId: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      const eventToAdd = action.payload;
      const existingEvent = state.cart.find(
        (item) => item.eventId === eventToAdd.eventId,
      );

      if (existingEvent) {
        const updatedCart = state.cart.map((item) => {
          if (item.eventId === eventToAdd.eventId) {
            return eventToAdd;
          } else {
            return item;
          }
        });

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        const newCart = [...state.cart, eventToAdd];
        return {
          ...state,
          cart: newCart,
        };
      }
    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.eventId !== action.payload.eventId,
        ),
      };
    case "GET_USER_CART_EVENT":
      return {
        ...state,
        cart: action.payload,
        totalPrice: action.totalPrice,
        cartId: action.cartId,
      };
    case "CLEAR_CART":
      return { cart: [], totalPrice: 0, cartId: null };
    default:
      return state;
  }
};
