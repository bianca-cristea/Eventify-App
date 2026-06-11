import React from "react";

const Backdrop = ({ data }) => {
  return (
    <div
      className={`z-20 transition-all duartion-200 opacity-80 w-screen h-screen bg-slate-800 fixed ${data ? "top-16" : "top-0"} left-0`}
    ></div>
  );
};

export default Backdrop;
