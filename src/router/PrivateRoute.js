import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const user = {
    logged: false,
  };
  //const { pathname, search } = useLocation();

  //localStorage.setItem("lastPath", pathname + search);

  const { uid } = useSelector((state) => state.auth);
  console.log(uid);

  return uid ? children : <Navigate to="/login" />;
};
