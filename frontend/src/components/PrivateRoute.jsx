import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
  publicPage = false,
  adminOnly = false,
  organizerOnly = false,
}) => {
  const { user } = useSelector((state) => state.auth);

  const roles = user?.roles || [];

  const isAdmin = roles.includes("ROLE_ADMIN");
  const isOrganizer = roles.includes("ROLE_ORGANIZER");

  if (publicPage) {
    return user ? <Navigate to="/" replace /> : <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (organizerOnly && !isOrganizer) {
    return <Navigate to="/" replace />;
  }
  if (organizerOnly && !isOrganizer) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
