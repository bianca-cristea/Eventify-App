import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14">
      <FaExclamationTriangle className="text-rose-400 text-3xl mb-4" />
      <p className="text-gray-400 mb-6 text-center">
        {message ? message : "An unexpected error occured."}
      </p>
    </div>
  );
};

export default ErrorPage;
