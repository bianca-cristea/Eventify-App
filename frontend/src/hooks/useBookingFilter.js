import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getBookingsForDashboard } from "../store/actions/actions";

const useBookingFilter = () => {
  const [] = useState();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.roles?.includes("ROLE_ADMIN");
  useEffect(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const queryString = params.toString();
    console.log("Query string: ", queryString);
    dispatch(getBookingsForDashboard(queryString, isAdmin));
  }, [dispatch, searchParams]);
};

export default useBookingFilter;
