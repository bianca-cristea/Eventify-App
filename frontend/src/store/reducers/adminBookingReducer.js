const initialState = {
  adminBooking: null,
  pagination: {},
};

export const adminBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MY_BOOKINGS":
      return { ...state, myBookings: action.payload };
    default:
      return state;
  }
};
