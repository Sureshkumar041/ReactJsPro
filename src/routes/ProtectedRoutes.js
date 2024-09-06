import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("accessToken") !== null;
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
