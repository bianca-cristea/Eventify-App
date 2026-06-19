import React, { useEffect } from "react";
import DashboardOverview from "./DashboardOverview";
import { BsCalendar4Event } from "react-icons/bs";
import { BsTicketPerforated } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { analyticsAction } from "../../../store/actions/actions";
import ErrorPage from "../../../components/shared/ErrorPage";
import Loader from "../../../components/shared/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const {
    analytics: { eventCount, totalRevenue, totalBookings },
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(analyticsAction());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <div>
      <div className="flex md:flex-row mt-8 flex-col lg:justify-between  rounded-lg bg-linear-to-r from-blue-950 to-blue-800 shadow-lg">
        <DashboardOverview
          title={"Total events"}
          amount={eventCount}
          Icon={BsCalendar4Event}
        />
        <DashboardOverview
          title={"Total bookings"}
          amount={totalBookings}
          Icon={BsTicketPerforated}
        />
        <DashboardOverview
          title={"Total revenue"}
          amount={totalRevenue}
          Icon={MdAttachMoney}
          revenue
        />
      </div>
    </div>
  );
};

export default Dashboard;
