const initialState = {
  myBookings: [],
  adminBooking: [],
  pagination: {},
};

export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MY_BOOKINGS":
      return {
        ...state,
        myBookings: action.payload,
      };

    case "GET_ADMIN_BOOKINGS":
      return {
        ...state,
        adminBooking: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
        },
      };

    default:
      return state;
  }
};
