import api from "../../api/api";



export const fetchEvents = () => async (dispatch) => {
      try{

          dispatch({type: "IS_FETCHING"});
          const {data} = await api.get(`/events`);
          dispatch({
            type: "FETCH_EVENTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.isLast
          });
          dispatch({ type: "IS_SUCCESS" })
      }
      catch(error){
        console.log(error); 
        dispatch({
          type: "IS_ERROR",
          payload: error?.response?.data?.message || "Failed to fatch events.",
        })
      }
}