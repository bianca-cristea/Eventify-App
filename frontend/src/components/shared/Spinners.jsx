import React from "react";

const Spinner = ({ className = "w-5 h-5 text-amber-500" }) => {
  return (
    <svg
      className={`${className} animate-spin`}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-100"
        fill="currentColor"
        d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z"
      />
    </svg>
  );
};

export default Spinner;
