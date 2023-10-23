import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../Compounent/image/AFT.png";

import "./LogIn.css";
import LoginImg from "../../assets/images/illustration1.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function LogIn() {
  const toastConfig = {
    position: "top-center",
    autoClose: 1500,
  };

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleForgetPass = async () => {
    navigate("/forgetPassword?email=" + credentials.email, { replace: true });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (credentials.email.trim() === "" || credentials.password.trim() === "") {
      toast.error("Please enter email and password", toastConfig);
      return;
    }

    try {
      let response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        credentials,
      );

      if (response.status === 200) {
        setCredentials({ email: "", password: "" });
        localStorage.setItem("aftJwtToken", response.data.token);
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
        <div className="logo_container">
          {/* <img src={logo} alt="logo" /> */}
          <h1>Log In</h1>
        </div>
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
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
            />
            <span
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash title="Hide" />
              ) : (
                <FaEye title="Show" />
              )}
            </span>
          </div>
        </div>

        <div className="forgot-password">
          <span className="forgot-password-text" onClick={handleForgetPass}>
            Forgot Password?
          </span>
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
