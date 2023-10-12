import React from "react";
import Navbar from "../Navbar/Navbar";
import { Navigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("aftJwtToken");

  return token ? (
    <>
      <Navbar />
      {Component}
      <Footer />
    </>
  ) : (
    <Navigate to="/Login" replace state={{ from: rest.location }} />
  );
};

export default ProtectedRoute;
