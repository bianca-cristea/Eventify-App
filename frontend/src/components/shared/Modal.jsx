import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";

function Modal({ open, setOpen, children, title = "" }) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50 transition-opacity duration-300" />

      <div className="fixed inset-0 flex items-center justify-end">
        <DialogPanel
          transition
          className="
            w-full max-w-[700px]
            h-full
            bg-white
            shadow-2xl
            transform
            transition
            duration-300
            data-closed:translate-x-full
          "
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <DialogTitle className="text-xl font-semibold text-slate-800">
              {title}
            </DialogTitle>

            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <RxCross1 className="text-xl text-slate-700" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto h-full">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default Modal;
