import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-20">
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
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
            partnerships, artists, or venues? Our team is ready to help you
            create memorable experiences.
          </p>

          <div className="mt-12 space-y-6">
            <a
              href="tel:+40712345678"
              className="flex items-center gap-4 group"
            >
              <div
                className="
                bg-amber-400/10
                p-4
                rounded-full
                border
                border-amber-400/20
                group-hover:bg-amber-400/20
                transition
              "
              >
                <FaPhone className="text-amber-400 text-xl" />
              </div>

              <div>
                <p className="text-slate-500 text-sm">Phone</p>

                <p className="text-white font-medium group-hover:text-amber-400 transition">
                  +40 712 345 678
                </p>
              </div>
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=bbianca.ccristea@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 group"
            >
              <div
                className="
      bg-amber-400/10
      p-4
      rounded-full
      border
      border-amber-400/20
      group-hover:bg-amber-400/20
      transition
    "
              >
                <FaEnvelope className="text-amber-400 text-xl" />
              </div>

              <div>
                <p className="text-slate-500 text-sm">Email</p>

                <p className="text-white font-medium group-hover:text-amber-400 transition">
                  bbianca.ccristea@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 group"
            >
              <div
                className="
                bg-amber-400/10
                p-4
                rounded-full
                border
                border-amber-400/20
                group-hover:bg-amber-400/20
                transition
              "
              >
                <FaMapMarkerAlt className="text-amber-400 text-xl" />
              </div>

              <div>
                <p className="text-slate-500 text-sm">Location</p>

                <p className="text-white font-medium group-hover:text-amber-400 transition">
                  350 Market Street, Suite 2100
                  <br />
                  San Francisco, California
                </p>
              </div>
            </a>
          </div>
        </div>

        <div
          className="
            bg-slate-950/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-8
            shadow-2xl
          "
        >
          <h2 className="text-white text-3xl font-bold mb-4">Get in touch</h2>

          <p className="text-slate-400 leading-relaxed mb-8">
            Have questions about events, tickets or partnerships? Reach out and
            our team will answer as soon as possible.
          </p>

          <div className="space-y-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=bbianca.ccristea@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="
                block
                text-center
                py-4
                rounded-xl
                bg-amber-400
                text-slate-950
                font-bold
                hover:bg-amber-300
                hover:scale-[1.02]
                transition-all
              "
            >
              Email Us
            </a>

            <a
              href="tel:+40712345678"
              className="
                block
                text-center
                py-4
                rounded-xl
                border
                border-white/10
                text-white
                font-bold
                hover:border-amber-400
                hover:text-amber-400
                transition-all
              "
            >
              Call Us
            </a>
          </div>

          <div
            className="
            mt-10
            p-5
            rounded-2xl
            bg-white/5
            border
            border-white/10
          "
          >
            <p className="text-slate-400 text-sm">Opening Hours</p>

            <p className="text-white font-medium mt-2">Monday - Friday</p>

            <p className="text-amber-400">09:00 AM - 18:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
