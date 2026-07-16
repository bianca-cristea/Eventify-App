import api from "../../api/api";
import { toast } from "react-toastify";

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

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.isLast,
    });
    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch categories.",
    });
  }
};

export const addToCart =
  (data, qty = 1) =>
  (dispatch, getState) => {
    const { events } = getState().events;

    const event = events.find((item) => item.eventId === data.id);

    if (!event) {
      toast.error("Event not found");
      return;
    }

    const selectedTicket =
      data.selectedTicket ||
      event.tickets?.find((ticket) => ticket.ticketType === "REGULAR");

    if (!selectedTicket) {
      toast.error("No ticket available");
      return;
    }

    if (Number(selectedTicket.capacity) < qty) {
      toast.error("Out of stock");
      return;
    }

    dispatch({
      type: "ADD_CART",
      payload: {
        ...event,
        quantity: qty,
        ticketId: selectedTicket.ticketId,
        ticketType: selectedTicket.ticketType,
        price: selectedTicket.price,
        tickets: event.tickets,
      },
    });

    toast.success(`${event.title} added to cart`);

    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const selectedTicket = data.ticketId
      ? data.tickets?.find((t) => t.ticketId === data.ticketId)
      : data.tickets?.find((t) => t.ticketType === "REGULAR");

    if (!selectedTicket) {
      toast.error("Ticket not found");
      return;
    }

    const isQuantityExist =
      Number(selectedTicket.capacity) >= currentQuantity + 1;

    if (isQuantityExist) {
      const newQuantity = currentQuantity + 1;

      setCurrentQuantity(newQuantity);

      dispatch({
        type: "ADD_CART",
        payload: {
          ...data,
          quantity: newQuantity,
        },
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
export const getBookingsForDashboard =
  (queryString, isAdmin) => async (dispatch) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const endpoint = isAdmin ? "/admin/bookings" : "/organizer/bookings";
      const { data } = await api.get(`${endpoint}?${queryString}`);
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
      dispatch({
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Failed to fetch bookings.",
      });
    }
  };

export const updateBookingStatusFromDashboard =
  (bookingId, bookingStatus, toast, setLoader, isAdmin) => async (dispatch) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "/admin/bookings" : "/organizer/bookings";
      const { data } = await api.put(`${endpoint}/${bookingId}/status`, {
        status: bookingStatus,
      });
      toast.success(data.message || "Booking updated successfully");
      await dispatch(getBookingsForDashboard(undefined, isAdmin));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal server error.");
    } finally {
      setLoader(false);
    }
  };

export const dashboardEventsAction =
  (queryString) => async (dispatch, getState) => {
    try {
      dispatch({ type: "IS_FETCHING" });

      const { user } = getState().auth;

      const isAdmin = user?.roles?.includes("ROLE_ADMIN");

      const endpoint = isAdmin
        ? `/admin/events?${queryString}`
        : `/events/me/events?${queryString}`;

      const { data } = await api.get(endpoint);

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
        payload:
          error?.response?.data?.message || "Failed to fetch dashboard events.",
      });
    }
  };

export const updateEventsFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);

      const { user } = getState().auth;
      const isAdmin = user?.roles?.includes("ROLE_ADMIN");

      const endpoint = isAdmin ? "/admin/events/" : "/organizer/events/";

      await api.put(`${endpoint}${sendData.id}`, sendData);

      toast.success("Event updated successfully.");
      reset();
      setOpen(false);

      await dispatch(
        dashboardEventsAction(
          "pageNumber=0&pageSize=5&sortBy=eventId&sortOrder=asc",
        ),
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.description ||
          error?.response?.data?.message ||
          error.message ||
          "Event update failed.",
      );
    } finally {
      setLoader(false);
    }
  };
export const addNewEventFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);

      const { user } = getState().auth;
      const isAdmin = user?.roles?.includes("ROLE_ADMIN");

      const endpoint = isAdmin ? "/admin/events" : "/organizer/events";

      await api.post(endpoint, sendData);

      toast.success("Event created successfully.");

      reset();
      setOpen(false);

      dispatch(
        dashboardEventsAction(
          "pageNumber=0&pageSize=5&sortBy=eventId&sortOrder=asc",
        ),
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.description || "Event creation failed.",
      );
    } finally {
      setLoader(false);
    }
  };

export const deleteEvent =
  (setLoader, eventId, toast, setOpenDeleteModal) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "/admin/events" : "/organizer/events";
      await api.delete(`${endpoint}/${sendData.id}`, sendData);

      toast.success("Event deleted successfully");
      setLoader(false);
      setOpenDeleteModal(false);
      dispatch(
        dashboardEventsAction(
          "pageNumber=0&pageSize=5&sortBy=eventId&sortOrder=asc",
        ),
      );
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Some error occured.");
    } finally {
      setLoader(false);
    }
  };

export const updateEventImageFromDashboard =
  (formData, eventId, toast, setLoader, setOpen, isAdmin) =>
  async (dispatch) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "/admin/events/" : "/organizer/events/";
      await api.put(`${endpoint}${eventId}/image`, formData);
      toast.success("Image upload successful");
      setLoader(false);
      setOpen(false);
      await dispatch(dashboardEventsAction());
    } catch (error) {
      toast.error(
        error?.response?.data?.description || "Event Image upload failed",
      );
    }
  };

export const getAllCategoriesDashboard = (queryString) => async (dispatch) => {
  dispatch({ type: "CATEGORY_LOADER" });
  try {
    const { data } = await api.get(`/public/categories?${queryString}`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data["content"],
      pageNumber: data["pageNumber"],
      pageSize: data["pageSize"],
      totalElements: data["totalElements"],
      totalPages: data["totalPages"],
      lastPage: data["lastPage"],
    });

    dispatch({ type: "CATEGORY_SUCCESS" });
  } catch (err) {
    console.log(err);

    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const createCategoryDashboardAction =
  (sendData, setOpen, reset, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });
      await api.post("/admin/categories", sendData);
      dispatch({ type: "CATEGORY_SUCCESS" });
      reset();
      toast.success("Category Created Successful");
      setOpen(false);
      await dispatch(fetchCategories());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to create new category",
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const updateCategoryDashboardAction =
  (sendData, setOpen, categoryID, reset, toast) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.put(`/admin/categories/${categoryID}`, sendData);

      dispatch({ type: "CATEGORY_SUCCESS" });

      reset();
      toast.success("Category Update Successful");
      setOpen(false);
      await dispatch(fetchCategories());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.categoryName || "Failed to update category",
      );

      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const deleteCategoryDashboardAction =
  (setOpen, categoryID, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CATEGORY_LOADER" });

      await api.delete(`/admin/categories/${categoryID}`);

      dispatch({ type: "CATEGORY_SUCCESS" });

      toast.success("Category Delete Successful");
      setOpen(false);
      await dispatch(fetchCategories());
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to delete category");
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Internal Server Error",
      });
    }
  };

export const addNewDashboardOrganizer =
  (sendData, toast, reset, setOpen, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      await api.post("/auth/signup", sendData);
      reset();
      toast.success("Organizer registered successfully!");

      await dispatch(getAllOrganizersDashboard());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.password ||
          "Internal Server Error",
      );
    } finally {
      setLoader(false);
      setOpen(false);
    }
  };
export const getAllOrganizersDashboard =
  (queryString) => async (dispatch, getState) => {
    const { user } = getState().auth;
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.get(`/auth/organizers?${queryString}`);
      dispatch({
        type: "GET_ORGANIZERS",
        payload: data["content"],
        pageNumber: data["pageNumber"],
        pageSize: data["pageSize"],
        totalElements: data["totalElements"],
        totalPages: data["totalPages"],
        lastPage: data["lastPage"],
      });

      dispatch({ type: "IS_SUCCESS" });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "IS_ERROR",
        payload:
          err?.response?.data?.message || "Failed to fetch organizers data",
      });
    }
  };
