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
        const updatedCart = state.cart.map((item) =>
          item.eventId === eventToAdd.eventId ? eventToAdd : item,
        );
        const newTotalPrice = updatedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart, totalPrice: newTotalPrice };
      } else {
        const newCart = [...state.cart, eventToAdd];
        const newTotalPrice = newCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));
        localStorage.setItem("cartItems", JSON.stringify(newCart));
        return { ...state, cart: newCart, totalPrice: newTotalPrice };
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
        totalPrice: action.payload.totalPrice,
        cartId: action.cartId,
      };
    case "CLEAR_CART":
      return { cart: [], totalPrice: 0, cartId: null };
    default:
      return state;
  }
};
