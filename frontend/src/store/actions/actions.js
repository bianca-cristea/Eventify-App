import api from "../../api/api";
import toast from "react-hot-toast";

export const fetchEvents = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/events?${queryString}`);
    dispatch({
      type: "FETCH_EVENTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.isLast,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fatch events.",
    });
  }
};

export const fetchCategories = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.isLast,
    });
    dispatch({ type: "IS_ERROR" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fatch categories.",
    });
  }
};

export const addToCart =
  (data, qty = 1) =>
  (dispatch, getState) => {
    const { events } = getState().events;

    const event = events.find((item) => item.eventId === data.id);
    console.log("EVENT OBJECT:", event);
    if (!event) {
      toast.error("Event not found");
      return;
    }

    if (event.capacity < qty) {
      toast.error("Out of stock");
      return;
    }

    dispatch({
      type: "ADD_CART",
      payload: {
        ...event,
        quantity: qty,
        specialPrice: data.selectedTicket
          ? data.selectedTicket.price
          : event.specialPrice,
        ticketType: data.selectedTicket?.ticketType || null,
        ticketId: data.selectedTicket?.ticketId || null,
      },
    });

    toast.success(`${data.title} added to cart`);

    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const isQuantityExist = data.capacity >= currentQuantity + 1;

    if (isQuantityExist) {
      const newQuantity = currentQuantity + 1;
      setCurrentQuantity(newQuantity);
      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity reached to limit.");
    }
  };
export const fetchMyBookings = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/bookings/my");
    dispatch({ type: "FETCH_MY_BOOKINGS", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch bookings.",
    });
  }
};
export const fetchMyProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/users/me");
    dispatch({ type: "FETCH_PROFILE", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch profile.",
    });
  }
};

export const updateMyProfile = (userDTO, toast) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.put("/users/me", userDTO);
    dispatch({ type: "FETCH_PROFILE", payload: data });
    dispatch({ type: "IS_SUCCESS" });
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update profile.");
    throw error;
  }
};

export const changePassword =
  (changePasswordDTO, toast) => async (dispatch) => {
    try {
      await api.put("/users/me/password", changePasswordDTO);
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to change password.",
      );
      throw error;
    }
  };
export const decreaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    dispatch({
      type: "ADD_CART",
      payload: { ...data, quantity: newQuantity },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({ type: "REMOVE_CART", payload: data });
  toast.success(`${data.title} concert has been removed from cart.`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};
export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/login", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();

      toast.success(data?.message || "User Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal Server Error",
      );
    } finally {
      setLoader(false);
    }
  };

export const logOutUser = (navigate) => (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  localStorage.removeItem("auth/signout");
  navigate("/login");
};

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  };
};
export const createBooking = (cartItems) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.post("/bookings", {
      bookingItems: cartItems,
    });
    dispatch({ type: "BOOKING_SUCCESS", payload: data });
    localStorage.setItem("bookingId", data.bookingId);
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create booking.",
    });
    throw error;
  }
};

export const createStripePaymentSecret =
  (sendData) => async (dispatch, getState) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const bookingId = localStorage.getItem("bookingId");
      const { data } = await api.post("/bookings/stripe-client-secret", {
        amount: Number(sendData.amount) * 100,
        currency: "usd",
        bookingId: Number(bookingId),
      });
      dispatch({ type: "CLIENT_SECRET", payload: data });
      localStorage.setItem("client-secret", JSON.stringify(data));
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to create client secret.",
      );
    }
  };

export const stripePaymentConfirmation =
  (sendData, setErrorMessage, setLoading, toast) =>
  async (dispatch, getState) => {
    try {
      setLoading(true);
      const { data } = await api.post(
        "/booking/users/payments/online",
        sendData,
      );
      if (data) {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret");
        localStorage.removeItem("bookingId");
        dispatch({ type: "REMOVE_CLIENT_SECRET" });
        dispatch({ type: "CLEAR_CART" });
        toast.success("Order accepted");
      } else {
        setErrorMessage("Payment failed,please try again.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Payment failed,please try again.");
    } finally {
      setLoading(false);
    }
  };

export const analyticsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/admin/app/analytics");
    dispatch({
      type: "FETCH_ANALYTICS",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch analytics data",
    });
  }
};
export const getBookingsForDashboard = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/admin/bookings?${queryString}`);
    dispatch({
      type: "GET_ADMIN_BOOKINGS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.isLast,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fatch events.",
    });
  }
};
