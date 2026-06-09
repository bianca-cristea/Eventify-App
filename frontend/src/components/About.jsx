import React from "react";
import img from "../assets/about picture.jpg";
import EventCard from "./shared/EventCard";
import { useSelector, useDispatch } from "react-redux";

const About = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-slate-50 text-4xl font-bold text-center mb-12">
        About us
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left mr-3">
          <p className="text-lg mb-4">
            Welcome to your destination for live music experiences. We are a
            concert-focused platform built for people who love music, energy,
            and unforgettable live shows. From intimate gigs to large arena
            concerts, we make it easy to discover events, explore artists, and
            book tickets in just a few clicks. Our mission is to connect fans
            with the artists they love and bring live music closer to everyone.
            We believe concerts are more than events, they are moments that stay
            with you. With a clean, fast, and modern interface, you can browse
            upcoming shows, check availability, and secure your spot instantly.
            No hassle, no confusion, just music. Whether you're chasing your
            favorite band or discovering new sounds, this is your place to
            experience live music the way it should be.
          </p>
        </div>
        <div className="w-full md:w-1/2 mb-6 mt-5 md:mb-0">
          <img
            src={img}
            alt="People reaching their hands toward the center in a group gesture (united through music)"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-indigo-500/0 via-indigo-400/30 to-indigo-500/0 my-6" />
      <div>
        <h1 className="text-slate-50 text-3xl font-bold text-center mb-3 mt-10">
          Our Events
        </h1>
        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm: grid-cols-2 gap-y-6 gap-x-6">
          {events &&
            events.map((event, idx) => <EventCard key={idx} {...event} />)}
        </div>
      </div>
    </div>
  );
};

export default About;
