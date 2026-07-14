import { Divider } from "@mui/material";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/actions";
import { toast } from "react-hot-toast";
import Status from "./Status";
import { MdClose, MdDone } from "react-icons/md";

function EventViewModal({ open, setOpen, event, isAvailable }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const dispatch = useDispatch();
  if (!event) return null;
  console.log("EVENT MODAL:", event);

  const {
    id,
    title,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    tickets,
  } = event;
  const handleAddToCart = () => {
    if (tickets?.length > 0 && !selectedTicket) {
      toast.error("Please select a ticket type");
      return;
    }
    dispatch(addToCart({ ...event, selectedTicket }, 1));
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel
          className="
          w-full max-w-4xl
          overflow-hidden
          rounded-2xl
          bg-linear-to-br from-black via-slate-950 to-indigo-950
          border border-white/10
          shadow-2xl
          flex flex-col md:flex-row
        "
        >
          {image && (
            <div className="md:w-1/2 relative">
              <img
                src={image}
                alt={title}
                className="
                w-full h-full object-cover
                min-h-[250] md:min-h-full
              "
              />

              <div className="absolute inset-0 bg-black/30" />
            </div>
          )}

          <div className="p-6 md:p-8 w-full text-white">
            <DialogTitle className="text-2xl md:text-3xl font-bold">
              {title}
            </DialogTitle>

            <div className="flex items-center justify-between mt-5">
              {isAvailable ? (
                <Status
                  text="Available"
                  icon={MdDone}
                  bg="bg-emerald-500/20"
                  color="text-emerald-300"
                />
              ) : (
                <Status
                  text="Sold Out"
                  icon={MdClose}
                  bg="bg-rose-500/20"
                  color="text-rose-300"
                />
              )}
            </div>

            <div className="h-px bg-white/10 my-6" />

            <p className="text-white/70 text-sm leading-relaxed">
              {description}
            </p>

            {tickets?.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-white/60 text-sm font-medium">
                  Select ticket type:
                </p>
                {tickets.map((ticket) => {
                  const available = ticket.capacity > 0;
                  return (
                    <button
                      key={ticket.ticketId}
                      disabled={!available}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`flex justify-between items-center px-4 py-3 rounded-lg border transition text-sm
    ${
      !available
        ? "opacity-40 cursor-not-allowed"
        : selectedTicket?.ticketId === ticket.ticketId
          ? "border-indigo-500 bg-indigo-500/20 text-white"
          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
    }`}
                    >
                      <div>
                        <div className="font-semibold text-white">
                          {ticket.ticketType}
                        </div>

                        <div className="text-xs text-white/50">
                          {ticket.capacity > 100
                            ? "Available"
                            : ticket.capacity > 20
                              ? "Limited availability"
                              : ticket.capacity > 0
                                ? "Only a few tickets left!"
                                : "Sold Out"}
                        </div>
                      </div>

                      <div className="text-indigo-300 font-bold text-lg">
                        ${Number(ticket.price).toFixed(2)}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
              >
                Close
              </button>
              {isAvailable && (
                <button
                  onClick={handleAddToCart}
                  className="px-5 py-2 rounded-full bg-indigo-600 border border-indigo-500 text-white hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default EventViewModal;
