import React from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { adminNavigation } from "../../utils/bannerList";
import classNames from "classnames";

const Sidebar = ({ onNavigate, isProfileLayout = false }) => {
  const pathName = useLocation().pathname;
  const { user } = useSelector((state) => state.auth);
  const sidebarLayout = adminNavigation;

  return (
    <div className="flex grow flex-col gap-y-7 overflow-y-auto bg-blue-950 px-6 pb-4">
      <div className="flex h-16 shrink-0 gap-x-3 pt-2">
        <FaTachometerAlt className="h-8 w-8 text-indigo-500" />
        <h1 className="text-white text-xl font-bold"> Admin Panel</h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="mx-2 space-y-4">
              {sidebarLayout.map((item) => {
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={onNavigate}
                      className={classNames(
                        pathName === item.href
                          ? "bg-blue-700 text-white"
                          : "bg-gray-500 hover:bg-gray-800 text-white",
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      )}
                    >
                      <item.icon className="text-2xl" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
