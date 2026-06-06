const initialState = {
    events: null,
    categories: null,
    pagination: {}
}

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_EVENTS":
        return {
            ...state,
            events: action.payload,
            pagination: {
                  ...state.pagination,
                  pageNumber: action.pageNumber,
                  pageSize: action.pageSize,
                  totalElements: action.totalElements,
                  totalPages: action.totalPages,
                  lastPage: action.isLast
            }
        }
         
      default:
        return state;
    }
};