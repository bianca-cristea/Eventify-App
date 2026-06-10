import React, { useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
import EventViewModal from "../shared/EventViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/actions";

const EventCard = ({
  eventId,
  title,
  description,
  image,
  location,
  eventDate,
  endDate,
  capacity,
  price,
  specialPrice,
  tickets,
}) => {
  const [openEventViewModal, setOpenEventViewModal] = useState(false);
  const [selectedViewEvent, setSelectedViewEvent] = useState(null);
  const dispatch = useDispatch();

  const btnLoader = false;
  const isAvailable = Number(capacity) > 0;

  const regularTicket = tickets?.find(
    (ticket) => ticket.ticketType === "REGULAR",
  );

  const currentPrice = Number(
    regularTicket?.specialPrice ??
      regularTicket?.price ??
      specialPrice ??
      price,
  );

  const oldPrice = currentPrice + 70;

  const hasTicketPricing = !!regularTicket;

  const eventData = {
    id: eventId,
    title,
    description,
    image,
    location,
    eventDate,
    endDate,
    capacity,
    price,
    specialPrice,
    tickets,
  };

  const handleEventView = () => {
    setSelectedViewEvent(eventData);
    setOpenEventViewModal(true);
  };

  return (
    <div
      className="group
      bg-linear-to-br from-black via-slate-950 to-indigo-950
      border border-white/10
      rounded-2xl
      overflow-hidden
      p-1
      shadow-xl
      transition
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
      hover:shadow-indigo-900/30"
    >
      <div
        onClick={handleEventView}
        className="relative w-full aspect-3/2 overflow-hidden cursor-pointer"
      >
        <img
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
          src={image}
          alt={title}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
      </div>

      <div className="m-2 text-white">
        <h2
          onClick={handleEventView}
          className="text-lg md:text-xl font-semibold cursor-pointer text-white group-hover:text-indigo-300 transition"
        >
          {truncateText(title, 30)}
        </h2>

        <p className="text-white/60 text-sm mt-2 min-h-16">
          {truncateText(description, 50)}
        </p>

        <div className="flex items-center justify-between mt-3">
          {hasTicketPricing ? (
            <div className="flex flex-col">
              <span className="text-white/40 text-md md:text-xl line-through">
                ${oldPrice.toFixed(2)}
              </span>

              <span className="text-indigo-300 text-md md:text-xl font-bold">
                ${currentPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-indigo-300 text-md md:text-xl font-bold">
              ${Number(price).toFixed(2)}
            </span>
          )}

          <button
            disabled={!isAvailable || btnLoader}
            onClick={handleEventView}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs md:text-base font-medium transition backdrop-blur-md border border-white/10"
          >
            <IoTicketOutline className="text-xl" />
            {isAvailable ? "Buy Ticket" : "Sold Out"}
          </button>
        </div>
      </div>

      <EventViewModal
        open={openEventViewModal}
        setOpen={setOpenEventViewModal}
        event={selectedViewEvent}
        isAvailable={isAvailable}
      />
    </div>
  );
};

export default EventCard;
