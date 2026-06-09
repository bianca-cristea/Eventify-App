const initialState = {
    events: null,
    categories: [],
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
        
        case "FETCH_CATEGORIES":
        return {
            ...state,
            categories: action.payload,
        }
      default:
        return state;
    }
};