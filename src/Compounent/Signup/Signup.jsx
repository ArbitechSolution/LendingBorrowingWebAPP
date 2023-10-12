import "../LogIn/LogIn.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// import LoginImg from '../../assets/images/login-image.jpg'
import LoginImg from "../../assets/images/illustration1.png";

function Signup() {
  const toastConfig = {
    position: "top-center",
    autoClose: 1500,
  };

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      credentials.username.trim() === "" ||
      credentials.email.trim() === "" ||
      credentials.password.trim() === "" ||
      credentials.confirmPassword.trim() === ""
    ) {
      toast.error("Please enter all the fields", toastConfig);
      return;
    }

    // validate password
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match", toastConfig);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          name: credentials.username,
          email: credentials.email,
          password: credentials.password,
        },
      );

      if (response.status === 201) {
        toast.success("Signed up successfully", toastConfig);
        setCredentials({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // save token to local storage
        localStorage.setItem("aftJwtToken", response.data.token);
        navigate("/landingPage");
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("Email already exists", toastConfig);
        return;
      } else {
        toast.error("Something went wrong", toastConfig);
        return;
      }
    }
  };

  return (
    <div className="auth_layout">
      <form onSubmit={handleSubmit} className="loginForm">
        <h1>Sign Up</h1>
        <div>
          <input
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleInputChange}
          />
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
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="forgot-password">
          <a href="/">Forgot Password?</a>
        </div> */}

        {/* <div className="checkbox-row">
          <label htmlFor="remember">Remember me</label>
          <input type="checkbox" name="remember" id="remember" />
        </div> */}
        <div className="button-row">
          <button type="submit" className="loginButton">
            Sign up
          </button>
        </div>
        <div className="signup-row">
          Already have an account?
          <Link to="/login">Log In</Link>
        </div>
      </form>
      <div className="image-container">
        <img src={LoginImg} alt="" />
      </div>
    </div>
  );
}

export default Signup;
