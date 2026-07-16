import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "../../store/actions/actions";
import { toast } from "react-toastify";

const ItemContent = ({
  eventId,
  title,
  description,
  image,
  location,
  eventDate,
  endDate,
  quantity,
  ticketId,
  ticketType,
  tickets,
  price,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const dispatch = useDispatch();

  const handleQtyIncrease = (cartItem) => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);

    dispatch(increaseCartQuantity(cartItem, newQuantity));
  };

  const handleQtyDecrease = (cartItem) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);

      dispatch(decreaseCartQuantity(cartItem, newQuantity));
    }
  };

  const removeItemFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem, toast));
  };

  const cartItem = {
    eventId,
    title,
    description,
    image,
    location,
    eventDate,
    endDate,
    quantity: currentQuantity,
    ticketId,
    ticketType,
    tickets,
    price,
  };

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 text-sm md:text-base gap-4 items-center border border-slate-200 rounded-lg p-4 bg-slate-950 shadow-sm hover:shadow-md transition">
      <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
        <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-1 items-start">
          <h3 className="text-sm md:text-[17px] m-auto font-semibold text-slate-50">
            {title}
          </h3>

          {ticketType && (
            <span className="text-xs text-indigo-300 font-medium">
              {ticketType}
            </span>
          )}
        </div>

        <div className="md:w-36 sm:w-24 w-12">
          <img
            src={image}
            alt={title}
            className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
          />

          <div className="flex items-start gap-5 mt-3">
            <button
              onClick={() => removeItemFromCart(cartItem)}
              className="flex m-auto items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-rose-400 border border-rose-400/30 bg-rose-400/10 hover:bg-rose-400/20 hover:border-rose-400/60 hover:text-rose-300 cursor-pointer transition-all duration-200"
            >
              <HiOutlineTrash size={16} className="text-rose-600" />
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="justify-self-center text-sm md:text-[17px] text-slate-50 font-semibold">
        ${Number(price).toFixed(2)}
      </div>

      <div className="justify-self-center">
        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handleQtyIncrease={() => handleQtyIncrease(cartItem)}
          handleQtyDecrease={() => handleQtyDecrease(cartItem)}
        />
      </div>

      <div className="justify-self-center text-sm md:text-[17px] text-slate-50 font-semibold">
        ${(Number(currentQuantity) * Number(price)).toFixed(2)}
      </div>
    </div>
  );
};

export default ItemContent;
