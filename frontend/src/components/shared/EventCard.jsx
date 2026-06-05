import React, { useState } from 'react'
import { IoTicketOutline } from "react-icons/io5";
import EventViewModal from '../events/EventViewModal'

const EventCard = ({
        id:eventId,
        eventName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice
}) => {

  const [openEventViewModal, setOpenEventViewModal] = useState(false);
  const [selectedViewEvent, setSelectedViewEvent] = useState("");
  const btnLoader = false;
  const isAvailable = quantity && Number(quantity) > 0;

  const handleEventView = (event) => {
    setSelectedViewEvent(event)
    setOpenEventViewModal(true)
  }


  return (
    <div className='bg-(--background-light-blue) border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300'>
       <div onClick={() => {handleEventView({ id: eventId,
                                              eventName,
                                              image,
                                              description,
                                              quantity,
                                              price,
                                              discount,
                                              specialPrice})}} 
            className='w-full overflow-hidden aspect=[3/2]'>
            <img className='w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105' src={image} alt={eventName}/>
       </div>
       <div className='p-4'>
           <h2 onClick={() => {
              handleEventView({ id: eventId,
                                eventName,
                                image,
                                description,
                                quantity,
                                price,
                                discount,
                                specialPrice}) }} 
           className='text-lg text-(--pink-color) font-semibold mb-2 cursor-pointer'>
            {eventName}
           </h2>
           <div className='min-h-20 max-h-20'>
             <p className='text-white text-sm'>{description}</p>
           </div>

          <div className='flex items-center justify-between'>
           {specialPrice ? (
            <div className='flex flex-col'>
              <span className='text-gray-400 text-sm line-through'>
                ${Number(price).toFixed(2)}
              </span> 
              <span className='text-(--pink-color) text-sm md:text-xl  font-bold'>
                ${Number(specialPrice).toFixed(2)}
              </span>
            </div>
            ) : ( 
              <div>
              <span></span>
              <span className='bg-(--pink-color) text-sm md:text-xl font-bold'> 
                ${Number(price).toFixed(2)}
              </span> 
              </div> 
           )}
           <button disabled={!isAvailable || btnLoader} 
                   onClick={() => {}}
                   className={` bg-(--pink-color) text-white p-1 md:p-2 rounded-sm items-center transition-colors duration-300 w-25 md:w-36 flex justify-center  ${isAvailable ? "opacity-100 cursor-pointer hover:bg-purple-600" : "opacity-70"}`}>
                <IoTicketOutline className='text-2xl mr-0 pr-0 md:mr-2 '/>
                <span className='text-sm md:text-lg'>{isAvailable ? ("Book ticket") : ("Out of stock")} </span> 
            </button>
           </div>
       </div>
       <EventViewModal 
          open = {openEventViewModal}
          setOpen = {setOpenEventViewModal} 
          event = {selectedViewEvent} 
          isAvailable = {isAvailable}/>
    </div>
  )
}

export default EventCard
