import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../LogIn/LogIn.css";
import { BiSolidCheckCircle } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [isLoading, setIsLoading] = useState(false);

  const toastConfig = {
    position: "top-center",
    autoClose: 1500,
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/forgetPassword",
        { email },
      );

      if (response.status === 200) {
        setIsLoading(false);
        setIsEmailSent(true);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 404) {
        toast.error("Email not found", toastConfig);
      } else {
        toast.error("Something went wrong", toastConfig);
      }
    }
  };

  return (
    <div className="auth_layout">
      <form onSubmit={handleResetPassword} className="loginForm">
        <div className="header">
          <h1>Reset Password</h1>
          <p>Please enter your email address to reset your password.</p>
        </div>
        {isLoading ? (
          <div className="spinner-position">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : isEmailSent ? (
          <div className="email-box">
            <BiSolidCheckCircle className="check-icon" />
            <p>
              An email has been sent to <b>{email}</b> with further
              instructions.
            </p>
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <button type="submit" className="forget-btn">
              Reset Password
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;
