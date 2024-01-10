import React, { useState, useEffect } from "react";
import "./Profile.css";
import CountrySelector from "../CustomSelector/CountrySelect";
import PhoneSelect from "../CustomSelector/PhoneSelect";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [active, setActive] = useState("account");
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    zipcode: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name);

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    if (
      user.name.trim() === "" ||
      user.email.trim() === "" ||
      user.address.trim() === "" ||
      user.city.trim() === "" ||
      user.country.trim() === "" ||
      user.phone.trim() === "" ||
      user.zipcode.trim() === ""
    ) {
      return toast.error("Please fill all the fields");
    }

    const token = localStorage.getItem("aftJwtToken");

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/updatedetails`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    toast.success("User Information Updated Successfully");
  };

  const getUserDetails = async () => {
    const token = localStorage.getItem("aftJwtToken");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const user = response.data.data;
      console.log(user);
      setUser({
        name: user.name,
        email: user.email,
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        phone: user.phone || "",
        zipcode: user.zipcode || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="card colorsa mb-4">
            <div
              className=" card-body"
              onClick={() => setActive("account")}
              style={{
                border: active === "account" && "1.2px solid #0C6EFD",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              <h5 className="card-title">Account Settings</h5>
              <p className="card-text">Details about your account</p>
            </div>
          </div>
          <div className="card colorsa">
            <div
              className="card-body"
              onClick={() => setActive("password")}
              style={{
                border: active === "password" && "1.2px solid #0C6EFD",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              <h5 className="card-title">Password and Security</h5>
              <p className="card-text">Details about your account</p>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card colorsa p-3">
            <div className="card-body">
              <h5 className="text-center card-title">
                Change User Information
              </h5>
              <form className="form-group infoForm" onSubmit={handleSubmit}>
                <div className="row my-4">
                  <div className="col-md-6 col-sm-12">
                    <input
                      type="text"
                      className=""
                      placeholder="Full Name"
                      value={user.name}
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="col-12">
                      <input
                        type="email"
                        className=""
                        placeholder="Email"
                        value={user.email}
                        name="email"
                        onChange={handleChange}
                        // DON'T ALLOW USER TO CHANGE EMAIL
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className=""
                      placeholder="Address"
                      value={user.address}
                      name="address"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-md-6 col-sm-12">
                    <input
                      type="text"
                      className=""
                      placeholder="City"
                      value={user.city}
                      name="city"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <CountrySelector
                      country={user.country}
                      handleChange={handleSelectChange}
                    />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-md-6 col-sm-12">
                    <PhoneSelect
                      name="phone"
                      handleChange={handleSelectChange}
                      phone={user.phone}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <input
                      type="number"
                      className="zipcode"
                      placeholder="Zipcode"
                      value={user.zipcode}
                      name="zipcode"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button type="submit" className="btn batan w-100">
                  Update Information
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
