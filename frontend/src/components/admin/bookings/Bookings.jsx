import React from "react";
import { CiShoppingBasket } from "react-icons/ci";
import BookingTable from "./BookingTable";
import { useSelector } from "react-redux";
import useBookingFilter from "../../../hooks/useBookingFilter";

const Bookings = () => {
  const { adminBooking, pagination } = useSelector((state) => state.bookings);

  useBookingFilter();
  console.log("adminBooking:", adminBooking);

  const emptyBooking = !adminBooking || adminBooking.length === 0;

  return (
    <div className="pb-6 pt-20">
      {emptyBooking ? (
        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
          <CiShoppingBasket size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No bookings yet.</h2>
        </div>
      ) : (
        <div>
          <BookingTable adminBooking={adminBooking} pagination={pagination} />
        </div>
      )}
    </div>
  );
};

export default Bookings;
