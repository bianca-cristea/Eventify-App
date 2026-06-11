import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950 px-4 py-20">
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-amber-400 uppercase tracking-[4px] font-semibold">
            Eventify
          </span>

          <h1 className="text-white text-5xl lg:text-6xl font-bold mt-4 leading-tight">
            Let's create unforgettable
            <span className="text-amber-400"> live experiences</span>
          </h1>

          <p className="text-slate-400 text-lg mt-6 leading-relaxed">
            Have questions about upcoming concerts, ticket reservations,
            partnerships, artists, or venues? Our team is ready to help you make
            every event memorable.
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-400/10 p-4 rounded-full border border-amber-400/20">
                <FaPhone className="text-amber-400 text-xl" />
              </div>

              <div>
                <p className="text-slate-500 text-sm">Phone</p>
                <p className="text-white font-medium">+40 712 345 678</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-amber-400/10 p-4 rounded-full border border-amber-400/20">
                <FaEnvelope className="text-amber-400 text-xl" />
              </div>

              <div>
                <p className="text-slate-500 text-sm">Email</p>
                <p className="text-white font-medium">support@eventify.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-amber-400/10 p-4 rounded-full border border-amber-400/20">
                <FaMapMarkerAlt className="text-amber-400 text-xl" />
              </div>

              <div>
                <p className="text-slate-500 text-sm">Location</p>
                <p className="text-white font-medium">
                  350 Market Street, Suite 2100
                  <br />
                  San Francisco, California
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-8
            shadow-2xl
          "
        >
          <h2 className="text-white text-3xl font-bold mb-2">Contact Us</h2>

          <p className="text-slate-400 mb-8">
            We'd love to hear from you. Send us a message and we'll get back to
            you as soon as possible.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-2 text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                required
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  placeholder:text-slate-500
                  focus:outline-none
                  focus:border-amber-400
                  transition-all
                "
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2 text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                required
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  placeholder:text-slate-500
                  focus:outline-none
                  focus:border-amber-400
                  transition-all
                "
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2 text-sm font-medium">
                Message
              </label>

              <textarea
                rows="5"
                placeholder="Tell us how we can help..."
                required
                className="
                  w-full
                  bg-white/5
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  placeholder:text-slate-500
                  focus:outline-none
                  focus:border-amber-400
                  transition-all
                  resize-none
                "
              />
            </div>

            <button
              type="submit"
              className="
                w-full
                py-4
                rounded-xl
                bg-amber-400
                text-slate-950
                font-bold
                cursor-pointer
                hover:bg-amber-300
                hover:scale-[1.02]
                transition-all
                duration-300
              "
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
