import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const toastConfig = {
    position: "top-center",
    autoClose: 1500,
  };

  const { resetToken } = useParams();

  const [creds, setCreds] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (creds.password.trim() === "" || creds.confirmPassword.trim() === "") {
      return toast.error("Please enter email and password", toastConfig);
    }

    if (creds.password !== creds.confirmPassword) {
      return toast.error("Passwords do not match", toastConfig);
    }

    try {
      // have to send
      let response = await axios.put(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/resetPassword/${resetToken}`,
        { password: creds.password },
      );

      if (response.status === 200) {
        setCreds({ password: "", confirmPassword: "" });
        // Redirect to the dashboard
        toast.success("Password reset successfully", toastConfig);
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 400) {
        return toast.error("Reset time expired", toastConfig);
      }
      toast.error("Something went wrong!", toastConfig);
    }
  };

  return (
    <div className="auth_layout">
      <form onSubmit={handleResetPassword} className="loginForm">
        <div className="header">
          <h1>Create a new password</h1>
          <p>Enter a new password for your account.</p>
        </div>

        <div>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New Password"
              value={creds.password}
              onChange={handlePasswordChange}
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

        <div>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={creds.confirmPassword}
              onChange={handlePasswordChange}
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
        <button type="submit" className="forget-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
