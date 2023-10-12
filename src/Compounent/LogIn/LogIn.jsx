import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./LogIn.css";
// import LoginImg from '../../assets/images/login-image.jpg'
import LoginImg from "../../assets/images/illustration1.png";

function LogIn() {
  const toastConfig = {
    position: "top-center",
    autoClose: 1500,
  };

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (credentials.email.trim() === "" || credentials.password.trim() === "") {
      toast.error("Please enter email and password", toastConfig);
      return;
    }

    try {
      // Check if the user exists in the database
      let response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        credentials,
      );

      if (response.status === 200) {
        setCredentials({ email: "", password: "" });
        localStorage.setItem("aftJwtToken", response.data.token);
        // Redirect to the dashboard
        toast.success("Logged in successfully", toastConfig);

        navigate("/landingPage");
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Invalid email or password", toastConfig);
      } else {
        toast.error("Something went wrong", toastConfig);
      }
    }
  };

  return (
    <div className="auth_layout">
      <form onSubmit={handleSubmit} className="loginForm">
        <h1>Log In</h1>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="forgot-password">
          <a href="/">Forgot Password?</a>
        </div>

        <div className="checkbox-row">
          <label htmlFor="remember">Remember me</label>
          <input type="checkbox" name="remember" id="remember" />
        </div>
        <div className="button-row">
          <button type="submit" className="loginButton">
            Login
          </button>
        </div>
        <div className="signup-row">
          Don't have an account?
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
      <div className="image-container">
        <img src={LoginImg} alt="" />
      </div>
    </div>
  );
}

export default LogIn;
