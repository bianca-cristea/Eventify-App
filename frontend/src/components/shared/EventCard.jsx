import React, { useState } from 'react';
import { IoTicketOutline } from "react-icons/io5";
import EventViewModal from '../events/EventViewModal';

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
    <div className="bg-(--background-light-blue) border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
 
      <div onClick={handleEventView} className="w-full overflow-hidden aspect-3/2">
        <img
          className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
          src={image}
          alt={title}
        />
      </div>

       
      <div className="p-4">
        <h2
          onClick={handleEventView}
          className="text-lg text-(--pink-color) font-semibold mb-2 cursor-pointer"
        >
          {title}
        </h2>

        <div className="min-h-20 max-h-20">
          <p className="text-white text-sm">{description}</p>
        </div>

    
        <div className="flex items-center justify-between mt-3">
          {specialPrice ? (
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm line-through">
                ${Number(price).toFixed(2)}
              </span>
              <span className="text(--pink-color) text-sm md:text-xl font-bold">
                ${Number(specialPrice).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-(--pink-color) text-sm md:text-xl font-bold">
              ${Number(price).toFixed(2)}
            </span>
          )}

          <button
            disabled={!isAvailable || btnLoader}
            onClick={handleEventView}
            className={`bg-(--pink-color) text-white p-1 md:p-2 rounded-sm w-25 md:w-36 flex justify-center items-center transition-colors duration-300
              ${isAvailable ? "opacity-100 cursor-pointer hover:bg-purple-600" : "opacity-70 cursor-not-allowed"}`}
          >
            <IoTicketOutline className="text-2xl mr-0 md:mr-2" />
            <span className="text-sm md:text-lg">
              {isAvailable ? "Book ticket" : "Out of stock"}
            </span>
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