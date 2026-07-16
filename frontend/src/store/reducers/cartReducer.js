const initialState = {
  cart: [],
  totalPrice: 0,
  cartId: null,
};

export const cartReducer = (state = initialState, action) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const email = auth?.email;

  switch (action.type) {
    case "ADD_CART": {
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

        if (email) {
          localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
          localStorage.setItem(`total_${email}`, JSON.stringify(newTotalPrice));
        }

        return {
          ...state,
          cart: updatedCart,
          totalPrice: newTotalPrice,
        };
      }

      const newCart = [...state.cart, eventToAdd];

      const newTotalPrice = newCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      if (email) {
        localStorage.setItem(`cart_${email}`, JSON.stringify(newCart));
        localStorage.setItem(`total_${email}`, JSON.stringify(newTotalPrice));
      }

      return {
        ...state,
        cart: newCart,
        totalPrice: newTotalPrice,
      };
    }

    case "REMOVE_CART": {
      const updatedCart = state.cart.filter(
        (item) => item.eventId !== action.payload.eventId,
      );

      const updatedTotal = updatedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      if (email) {
        localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
        localStorage.setItem(`total_${email}`, JSON.stringify(updatedTotal));
      }

      return {
        ...state,
        cart: updatedCart,
        totalPrice: updatedTotal,
      };
    }

    case "LOAD_CART":
      return {
        ...state,
        cart: action.payload.cart,
        totalPrice: action.payload.totalPrice,
      };

    case "GET_USER_CART_EVENT": {
      const totalPrice = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return {
        ...state,
        cart: action.payload,
        totalPrice,
        cartId: action.cartId,
      };
    }

    case "CLEAR_CART":
      return {
        cart: [],
        totalPrice: 0,
        cartId: null,
      };

    default:
      return state;
  }
};
