import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ publicPage = false, adminOnly = false }) => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
  const isOrganizer = user && user?.roles.includes("ROLE_ORGANIZER");
  const location = useLocation();

  if (publicPage) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }
  if (adminOnly) {
    if (isOrganizer && !isAdmin) {
      const organizerAllowedPaths = ["/admin/bookings", "/admin/events"];
      const organizerAllowed = organizerAllowedPaths.some((path) =>
        location.pathname.startsWith(path),
      );
      if (!organizerAllowed) {
        return <Navigate to="/" replace />;
      }
    }
  }
  if (!isAdmin && !isOrganizer) {
    return <Navigate to="/" />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
