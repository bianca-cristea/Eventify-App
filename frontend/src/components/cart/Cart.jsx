import React from "react";
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);

  const newCart = { ...cart };
  newCart.totalPrice = cart?.reduce(
    (acc, curr) => acc + Number(curr?.specialPrice) * Number(curr?.quantity),
    0,
  );

  if (!cart || cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="lg:px-14 m:px-8 px-4">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-slate-50 flex items-center gap-3">
          <FaOpencart size={26} className="text-amber-400" />
          Your cart
        </h1>
        <p className="text-lg text-slate-50 mt-2">All your selected items</p>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
        <div className="md:col-span-2 justify-self-start text-lg text-slate-50 lg:ps-4">
          Event
        </div>
        <div className="justify-self-center text-lg text-slate-50">Price</div>
        <div className="justify-self-center text-lg text-slate-50">
          Quantity
        </div>
        <div className="justify-self-center text-lg text-slate-50">Total</div>
      </div>

      <div>
        {cart &&
          cart.length > 0 &&
          cart.map((item, i) => <ItemContent key={i} {...item} />)}
      </div>

      <div className="mt-8 border-t border-slate-700  flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
        <div></div>
        <div className="flex text-sm gap-1 flex-col ">
          <div className="flex justify-between w-full md:text-lg text:sm font-semibold">
            <span>Subtotal</span>
            <span>${Number(newCart?.totalPrice).toFixed(2)}</span>
          </div>
          <p className="text-slate-50">
            Tickets are digital and will be delivered after purchase
          </p>
          <Link className="w-full flex justify-end" to="/checkout">
            <button
              onClick={() => {}}
              className="font-semibold w-full mt-3 py-2 px-4 rounded-sm text-shite flex items-center justify-center gap-2 bg-slate-800 cursor-pointer  hover:text-gray-300 transition duration-500"
            >
              <IoBagCheckOutline size={20} />
              Checkout
            </button>
          </Link>

          <Link
            className="flex gap-2 items-center mt-2 text-slate-500"
            to="/events"
          >
            <MdArrowBack />
            <span>Continue shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
