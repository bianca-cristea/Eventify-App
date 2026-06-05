import React from 'react'
import EventCard from '../shared/EventCard';
import {FaExclamationTriangle} from 'react-icons/fa'


const Events = () => {
  const isLoading = false;
  const errorMessage = ""
  const events = [
  {
        eventId:1,
        eventName:"Coldplay",
        image:"https://placehold.co/600x400",
        description:"Coldplay concert is full of lights.",
        quantity:0,
        price:1450.0,
        discount: 10.0,
        specialPrice: 1305.0
      },
      {
        eventId:2,
        eventName:"Zara Larsson",
        image:"https://placehold.co/600x400",
        description:"Zara Larsson is a new artist full of color and sparkle.",
        quantity:1,
        price:2550.0,
        discount: 20.0,
        //specialPrice: 2040.0
      },
       {
        eventId:3,
        eventName:"Beyonce",
        image:"https://placehold.co/600x400",
        description:"Beyonce - full of energy and dancing queen",
        quantity:2,
        price:3000.0,
        discount: 10.0,
        specialPrice: 2800.0
      },
]
  return (
    <div className='lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto'>
        {
          isLoading ? (
            <p>It's loading...</p>
          ) : errorMessage ? (
            <div className='flex justify-center items-center h-[200]'>
               <FaExclamationTriangle className='text-slate-800 text-3xl mr-2'/>
               <span className='text-slate-800 text-lg font-medium'>{errorMessage}</span>
            </div>
          ):(
            <div className='min-h-[700]'>
                <div className='pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm: grid-cols-2 gap-y-6 gap-x-6'>
                  {events && 
                  events.map((event,idx) => <EventCard key={idx} {...event}/>)
                  } 
                </div>
            </div>
          )
        }
    </div>
  )
}

export default Events
