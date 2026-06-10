import { configureStore } from "@reduxjs/toolkit";
import { eventReducer } from "./eventReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialState = {
  carts: { cart: cartItems },
};

export const store = configureStore({
  reducer: {
    events: eventReducer,
    errors: errorReducer,
    carts: cartReducer,
  },
  preloadedState: initialState,
});

export default store;
