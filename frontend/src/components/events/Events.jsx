import React, { useEffect } from "react";
import EventCard from "../shared/EventCard";
import { FaExclamationTriangle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, fetchEvents } from "../../store/actions/actions";
import Filter from "./Filter.jsx";
import useEventFilter from "../../hooks/useEventFilter.js";
import { RotatingLines } from "react-loader-spinner";
import Loader from "../shared/Loader.jsx";
import Paginations from "../shared/Paginations.jsx";

const Events = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const { events, categories, pagination } = useSelector(
    (state) => state.events,
  );

  const dispatch = useDispatch();
  useEventFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log(events);
  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <Filter categories={categories ? categories : []} />
      {isLoading ? (
        <Loader text="Events loading" />
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-[200]">
          <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
          <span className="text-slate-800 text-lg font-medium">
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className="min-h-[700]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm: grid-cols-2 gap-y-6 gap-x-6">
            {events &&
              events.map((event, idx) => <EventCard key={idx} {...event} />)}
          </div>
          <div className="flex justify-center pt-10">
            <Paginations
              numberOfPage={pagination?.totalPages}
              totalEvents={pagination?.totalElements}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
