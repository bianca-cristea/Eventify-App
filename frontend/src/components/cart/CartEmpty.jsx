import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center ">
        <FaOpencart size={80} className="mb-20 text-amber-300" />
        <div className="text-2xl font-bold text-slate-50">
          Your cart is empty
        </div>
        <div className="text-lg  text-slate-50 mt-2">
          Get started by adding some top events on your list.
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/events"
          className="flex gap-2 items-center transition-colors duration-150 hover:text-amber-300"
        >
          <GiMicrophone size={24} />
          <span>See events</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
