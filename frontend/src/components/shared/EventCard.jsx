import React, { useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
import EventViewModal from "../shared/EventViewModal";
import truncateText from "../../utils/truncateText";

const EventCard = ({
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
  status,
}) => {
  const [openEventViewModal, setOpenEventViewModal] = useState(false);
  const [selectedViewEvent, setSelectedViewEvent] = useState(null);

  const btnLoader = false;
  const isAvailable = Number(capacity) > 0;

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
    status,
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
          className=" w-full h-full object-cover
          transition duration-500
          group-hover:scale-110"
          src={image}
          alt={title}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
      </div>

      <div className="p-5 text-white">
        <h2
          onClick={handleEventView}
          className="text-lg md:text-xl font-semibold
                      cursor-pointer
                    text-white
                    group-hover:text-indigo-300
                      transition"
        >
          {truncateText(title, 60)}
        </h2>

        <p className="text-white/60 text-sm mt-2 min-h-16">
          {truncateText(description, 90)}
        </p>

        <div className="flex items-center justify-between mt-5">
          {specialPrice ? (
            <div className="flex flex-col">
              <span className="text-white/40 line-through text-sm">
                ${Number(price).toFixed(2)}
              </span>
              <span className="text-indigo-300 text-lg font-bold">
                ${Number(specialPrice).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-indigo-300 text-lg font-bold">
              ${Number(price).toFixed(2)}
            </span>
          )}

          <button
            disabled={!isAvailable || btnLoader}
            onClick={handleEventView}
            className={`
            flex items-center gap-2
            px-4 py-2
            rounded-lg
            text-sm md:text-base
            font-medium
            transition
            backdrop-blur-md
            border border-white/10
            ${
              isAvailable
                ? "bg-white/10 hover:bg-white/20 cursor-pointer"
                : "bg-white/5 opacity-50 cursor-not-allowed"
            }
          `}
          >
            <IoTicketOutline className="text-xl" />
            {isAvailable ? "Book Ticket" : "Sold Out"}
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
