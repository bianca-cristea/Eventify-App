const initialState = {
  organizers: null,
  pagination: {},
};

export const organizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORGANIZERS":
      return {
        ...state,
        organizers: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };
    default:
      return state;
  }
};
