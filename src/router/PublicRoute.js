import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {
  const user = {
    logged: false,
  };

  const { uid } = useSelector((state) => state.auth);
  console.log(uid);
  return uid ? <Navigate to="/home" /> : children;
};
