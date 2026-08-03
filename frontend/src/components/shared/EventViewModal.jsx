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
import { MdDone, MdClose } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function EventViewModal({ open, setOpen, event }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const dispatch = useDispatch();

  if (!event) return null;

  const { title, image, description, tickets } = event;
  const isAvailable = tickets?.some((ticket) => ticket.capacity > 0);
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
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            className="
              relative
              w-full
              max-w-3xl
              max-h-[82vh]
              overflow-y-auto
              rounded-2xl
              bg-linear-to-br
              from-black
              via-slate-950
              to-indigo-950
              border
              border-white/10
              shadow-2xl
              flex
              flex-col
              md:flex-row
            "
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-black/40 hover:bg-black/70 transition"
            >
              <IoClose className="text-xl text-white" />
            </button>

            {image && (
              <div className="md:w-[42%] relative flex-shrink-0">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-56 md:h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />
              </div>
            )}

            <div className="w-full p-5 md:p-6 text-white">
              <DialogTitle className="text-xl md:text-2xl font-bold pr-12">
                {title}
              </DialogTitle>

              <div className="mt-5">
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

              <div className="h-px bg-white/10 my-4" />

              <p className="text-white/70 leading-relaxed">{description}</p>

              {tickets?.length > 0 && (
                <div className="mt-5 space-y-3">
                  <p className="text-white/60 font-medium">
                    Select ticket type
                  </p>

                  {tickets.map((ticket) => {
                    const available = ticket.capacity > 0;

                    return (
                      <button
                        key={ticket.ticketId}
                        disabled={!available}
                        onClick={() => setSelectedTicket(ticket)}
                        className={`w-full flex justify-between items-center rounded-xl border px-4 py-3 transition
                          ${
                            !available
                              ? "opacity-40 cursor-not-allowed border-white/10"
                              : selectedTicket?.ticketId === ticket.ticketId
                                ? "border-indigo-500 bg-indigo-500/20"
                                : "border-white/10 bg-white/5 hover:bg-white/10"
                          }`}
                      >
                        <div className="text-left">
                          <div className="font-semibold text-white">
                            {ticket.ticketType}
                          </div>

                          <div className="text-xs text-white/50 mt-1">
                            {ticket.capacity > 100
                              ? "Available"
                              : ticket.capacity > 20
                                ? "Limited availability"
                                : ticket.capacity > 0
                                  ? "Only a few tickets left!"
                                  : "Sold Out"}
                          </div>
                        </div>

                        <div className="text-lg font-bold text-indigo-300">
                          ${Number(ticket.price).toFixed(2)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm rounded-full border border-white/10 bg-white/10 hover:bg-white/20 transition"
                >
                  Close
                </button>

                {isAvailable && (
                  <button
                    onClick={handleAddToCart}
                    className="px-4 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default EventViewModal;
