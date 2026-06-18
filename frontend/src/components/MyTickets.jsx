import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QRCodeSVG } from "qrcode.react";
import { fetchMyBookings } from "../store/actions/actions";

const MyTickets = () => {
  const dispatch = useDispatch();
  const { myBookings } = useSelector((state) => state.bookings);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, []);

  if (isLoading) return <div className="text-white p-8">Loading...</div>;
  if (errorMessage) return <div className="text-white p-8">{errorMessage}</div>;

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6 items-center">
      <h1 className="text-2xl font-bold text-white mb-4">My Tickets</h1>

      {myBookings?.map((booking) => (
        <div
          key={booking.bookingId}
          className="w-full max-w-lg bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">
              Booking #{booking.bookingId}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === "CONFIRMED"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-yellow-500/20 text-yellow-300"
              }`}
            >
              {booking.status}
            </span>
          </div>

          {booking.bookingItems?.map((item, idx) => (
            <div key={idx} className="border-t border-white/10 pt-3">
              <h3 className="text-white font-bold">{item.eventTitle}</h3>
              <p className="text-white/60 text-sm">{item.ticketType}</p>
              <p className="text-white/50 text-xs">
                {new Date(item.eventDate).toLocaleDateString("ro-RO", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-white/50 text-xs">{item.eventLocation}</p>
              <p className="text-indigo-300 font-bold mt-1">
                ${item.priceAtBooking} x{item.quantity}
              </p>
            </div>
          ))}

          {booking.status === "CONFIRMED" && (
            <div className="flex flex-col items-center mt-4 bg-white p-4 rounded-xl">
              <QRCodeSVG value={booking.qrCode} size={180} />
              <p className="text-black/50 text-xs mt-2 break-all">
                {booking.qrCode}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
