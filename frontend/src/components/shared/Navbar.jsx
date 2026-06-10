import React, { useState } from "react";
import { GiSparkles } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { IoTicketOutline } from "react-icons/io5";
import { IconButton, Badge } from "@mui/material";
import { BsTicketPerforated } from "react-icons/bs";
import { IoIosLogIn, IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const { cart } = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  return (
    <div className="h-18 sm:h-20 bg-slate-950 text-white z-50 items-center sticky top-0">
      <div className="lg:px-4 sm:px-8 w-full flex justify-between h-full items-center">
        <Link to="/" className="flex items-center text-2xl font-bold">
          <GiSparkles className="text-amber-400 mr-1 text-3xl" />
          <span className="font-[Poppins]">Eventify</span>
        </Link>

        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center  text-slate-800 sm:static absolute left-0 top-[75] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }  transition-all duration-100 sm:h-fit bg-slate-950 bg-custom-gradient   text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          <li className="font-500 text-white/70 hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-amber-300">
            <Link
              className={`${path === "/" ? "text-white font-semibold" : "text-gray-200"}`}
              to="/"
            >
              Home
            </Link>
          </li>

          <li className="font-500  hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-amber-300">
            <Link
              className={`${path === "/events" ? "text-white font-semibold" : "text-gray-200"}`}
              to="/events"
            >
              Events
            </Link>
          </li>

          <li className="font-500 hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-amber-300">
            <Link
              className={`${path === "/about" ? "text-white font-semibold" : "text-gray-200"}`}
              to="/about"
            >
              About
            </Link>
          </li>

          <li className="font-500 hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-amber-300">
            <Link
              className={`${path === "/contact" ? "text-white font-semibold" : "text-gray-200"}`}
              to="/contact"
            >
              Contact
            </Link>
          </li>

          <li className="transition-all duration-150">
            <Link
              className={`flex flex-col ${path === "/cart" ? "text-white font-semibold" : "text-gray-200"}`}
              to="/cart"
            >
              <IconButton
                aria-label="tickets"
                className="
                      relative
                      text-white
                      bg-white/5
                      border border-white/10
                      backdrop-blur-md
                      hover:bg-white/10
                      transition
                      duration-300
                      rounded-full
                      p-3       
                    "
              >
                <Badge
                  badgeContent={cart?.length || 0}
                  color="error"
                  className="text-white"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#f97316",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: "0 0 5px rgba(249,115,22,0.6)",
                    },
                  }}
                >
                  <BsTicketPerforated className="text-xl text-amber-300 drop-shadow-[0_0_8px_rgba(255,180,0,0.6)]" />
                </Badge>
              </IconButton>
              <span className="text-xs mt-0 text-center hover:text-amber-300">
                Tickets
              </span>
            </Link>
          </li>

          <li className="transition-all pt-2 duration-150">
            <Link
              className={`${path === "/login" ? "text-white font-semibold" : "text-gray-200"}`}
              to="/login"
            >
              <IoIosLogIn className="text-2xl text-amber-300 drop-shadow-[0_0_8px_rgba(255,180,0,0.6)]" />

              <span className="text-xs text-center hover:text-amber-300">
                Login
              </span>
            </Link>
          </li>
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center text-white sm:mt-0 mt-2 mr-2"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-2xl" />
          ) : (
            <IoIosMenu className="text-white text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
