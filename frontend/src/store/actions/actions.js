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
      },
    });

    toast.success(`${data.title} added to cart`);

    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };
