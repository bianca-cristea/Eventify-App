import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { dashboardEventsAction, fetchEvents } from "../store/actions/actions";

export const useEventFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);
    params.set("pageSize", 8);
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const categoryParams = searchParams.get("category") || null;
    const keyword = searchParams.get("keyword") || "";
    params.set("sortBy", "eventId");
    params.set("sortOrder", sortOrder);

    if (categoryParams) params.set("category", categoryParams);

    if (keyword) params.set("keyword", keyword);

    const queryString = params.toString();
    console.log("Query string: ", queryString);
    dispatch(fetchEvents(queryString));
  }, [dispatch, searchParams]);
};

export const useDashboardEventFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const queryString = params.toString();
    dispatch(dashboardEventsAction(queryString));
  }, [dispatch, searchParams]);
};

export default useEventFilter;
