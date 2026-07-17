import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createBooking } from "../../store/actions/actions";

const OrderSummary = ({ handleNext }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);
  const [loading, setLoading] = useState(false);
  const total = cart?.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );

  const handleContinue = async () => {
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setLoading(true);
    try {
      await dispatch(createBooking(cart));
      handleNext();
    } catch (error) {
      toast.error("Failed to create booking");
    } finally {
      setLoading(false);
    }
  };
  console.log("Cart items: ");
  cart?.forEach((item) => {
    console.log(item);
  });
  return (
    <div className="mt-8 flex flex-col gap-4">
      <h2 className="text-white text-xl font-semibold mb-2">Your Tickets</h2>
      {cart?.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-white font-semibold">{item.title}</h3>
            {item.ticketType && (
              <span className="text-xs text-indigo-300">{item.ticketType}</span>
            )}
            <p className="text-white/50 text-xs mt-1">
              {new Date(item.eventDate).toLocaleDateString("ro-RO", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-xs">x{item.quantity}</p>
            <p className="text-indigo-300 font-bold">
              ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
        <span className="text-white/70">Total</span>
        <span className="text-white text-xl font-bold">
          ${total?.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleContinue}
          disabled={loading}
          className="px-8 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
