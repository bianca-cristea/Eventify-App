import { Divider } from "@mui/material";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import Status from "./Status";
import { MdClose, MdDone } from "react-icons/md";

function EventViewModal({ open, setOpen, event, isAvailable }) {
  if (!event) return null;

  const {
    id,
    title,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  } = event;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="
          w-full max-w-3xl
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
              {specialPrice ? (
                <div className="flex flex-col">
                  <span className="text-white/40 line-through text-sm">
                    ${Number(price).toFixed(2)}
                  </span>
                  <span className="text-indigo-300 text-xl font-bold">
                    ${Number(specialPrice).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-indigo-300 text-xl font-bold">
                  ${Number(price).toFixed(2)}
                </span>
              )}

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

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setOpen(false)}
                className="
                px-5 py-2
                rounded-full
                bg-white/10
                border border-white/10
                text-white
                hover:bg-white/20
                transition
                backdrop-blur-md
              "
              >
                Close
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default EventViewModal;
