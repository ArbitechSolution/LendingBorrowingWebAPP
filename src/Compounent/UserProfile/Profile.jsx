import React,{useState} from "react";
import "./Profile.css";
import CountrySelector from "../CountrySelector/CountrySelect";

const UserProfile = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="card colorsa mb-4">
            <div className=" card-body">
              <h5 className="card-title">Account Settings</h5>
              <p className="card-text">Details about your account</p>
            </div>
          </div>
          <div className="card colorsa">
            <div className="card-body">
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
              <form className="form-group infoForm">
                <div className="row my-4">
                  <div className="col-md-6 col-sm-12">
                    <input type="text" className="" placeholder="Full Name" />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="col-12">
                      <input type="email" className="" placeholder="Email" />
                    </div>
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-md-12">
                    <input type="text" className="" placeholder="Address" />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-md-6 col-sm-12">
                    <input type="text" className="" placeholder="City" />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <CountrySelector country="Pakistan"/>
                  </div>
                </div>
              </form>
              <button className="btn batan w-100">Update Information</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
