import { Divider } from '@mui/material';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

import Status from './Status';
import { MdClose, MdDone } from 'react-icons/md';

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
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

 
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">

          <DialogPanel className="relative w-full max-w-[420px] overflow-hidden rounded-lg bg-white shadow-xl flex flex-col md:flex-row">
 
            {image && (
              <div className="flex justify-center md:w-1/2">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

          
            <div className="px-6 pt-6 pb-4 w-full">

              <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
                {title}
              </DialogTitle>

               
              <div className="space-y-2 text-gray-700 pb-4">

                <div className="flex items-center justify-between gap-2">
                  {specialPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through">
                        ${Number(price).toFixed(2)}
                      </span>
                      <span className="text-xl font-semibold text-slate-700">
                        ${Number(specialPrice).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold">
                      ${Number(price).toFixed(2)}
                    </span>
                  )}

                  {isAvailable ? (
                    <Status
                      text="In Stock"
                      icon={MdDone}
                      bg="bg-teal-200"
                      color="text-teal-900"
                    />
                  ) : (
                    <Status
                      text="Out of Stock"
                      icon={MdClose}
                      bg="bg-rose-200"
                      color="text-rose-700"
                    />
                  )}
                </div>

                <Divider />

                <p className="text-sm text-gray-600">
                  {description}
                </p>
              </div>
 
              <div className="flex justify-end gap-4 pt-2">
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-purple-600 border border-purple-700 hover:text-white hover:bg-purple-700 rounded-md transition-colors duration-300 cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </DialogPanel>

        </div>
      </div>
    </Dialog>
  );
}

export default EventViewModal;