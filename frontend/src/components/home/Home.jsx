import React, { useEffect } from "react";
import HeroBanner from "./HeroBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/actions/actions";
import EventCard from "../shared/EventCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4">
      <div className="py-6">
        <HeroBanner />
      </div>
      <div className="py-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h1 className="text-slate-500 text-4xl font-bold">Events</h1>
          <span className="text-slate-200">
            Discover the selection of top rated events.
          </span>
        </div>
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="flex justify-center items-center h-[200]">
            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
            <span className="text-slate-800 text-lg font-medium">
              {errorMessage}
            </span>
          </div>
        ) : (
          <div className="pb-6 pt-14 grid 2xl:grid-cols-3 lg:grid-cols-3 sm: grid-cols-2 gap-y-6 gap-x-6">
            {events &&
              events
                ?.slice(0, 3)
                .map((event, idx) => <EventCard key={idx} {...event} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
