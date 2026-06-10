import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
      style={{ backgroundImage: "url('')" }}
    >
      <div className="bg-indigo-950 shadow-2xl rounded-2xl p-10 w-full max-w-lg border border-white/10 backdrop-blur-xl">
        <h1 className="text-white text-4xl font-bold text-center mb-4 tracking-tight">
          Contact us
        </h1>
        <p className="text-white/60 text-center mb-8 text-sm md:text-base">
          Hello! Please fill out the form or contact us directly.
        </p>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              rows="4"
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <button className="w-full bg-amber-300 text-black font-medium py-2 rounded-lg hover:bg-amber-400 cursor-pointer transition duration-300">
            Send message
          </button>
        </form>
        <div className="mt-8 text-center">
          <h2 className="text-lg text--slate-50">Contact information</h2>
          <div className="flex flex-col items-center space-y-2 mt-4">
            <div className="flex items-center">
              <FaPhone className="text-amber-400 mr-2" />
              <span className="text-gray-50">+40 7123/456/789</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-amber-400 mr-2" />
              <span className="text-gray-50">info.eventify@gmail.com</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-amber-400 mr-2" />
              <span className="text-gray-50">
                350 Market Street, Suite 2100 San Francisco, US
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
