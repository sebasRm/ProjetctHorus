import React from "react";
import { useNavigate } from "react-router-dom";

export const HomeScreen = () => {
  const navigate = useNavigate();
  const handleStation = () => {
    navigate("/gestion");
  };

  return (
    <div className="container">
      <h1>HomeScreen</h1>
      <button onClick={handleStation}>File Station</button>
    </div>
  );
};
