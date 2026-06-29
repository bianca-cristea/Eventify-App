import { configureStore } from "@reduxjs/toolkit";
import { eventReducer } from "./eventReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";
import { bookingReducer } from "./bookingReducer";
import { adminReducer } from "./adminReducer";
import { organizerReducer } from "./organizerReducer";

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const totalPrice = localStorage.getItem("totalPrice")
  ? JSON.parse(localStorage.getItem("totalPrice"))
  : 0;

const initialState = {
  auth: { user: user },
  carts: {
    cart: cartItems,
    totalPrice: totalPrice,
  },
};

export const store = configureStore({
  reducer: {
    events: eventReducer,
    errors: errorReducer,
    carts: cartReducer,
    auth: authReducer,
    admin: adminReducer,
    payment: paymentMethodReducer,
    bookings: bookingReducer,
    organizers: organizerReducer,
  },
  preloadedState: initialState,
});

export default store;
