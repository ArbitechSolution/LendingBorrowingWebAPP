import React, { useState } from "react";
import drop from "../image/drop.svg";
function Referrals() {
  const [showFirstData, setShowFirstData] = useState(true);

  const handleFirstButtonClick = () => {
    setShowFirstData(true);
  };

  const handleSecondButtonClick = () => {
    setShowFirstData(false);
  };
  return (
    <div className="px-md-5 px-2 mt-5 " style={{ marginBottom: "125px" }}>
      <h2>
        Referrals <img src={drop} alt="" />
      </h2>
      <p>
        Get fee discounts and earn rebates through the AFT referral program.
        <br />
        For more information, please read the referral program details.
      </p>
      <div className="btn-group d-flex w-25 m-auto " role="group" aria-label="Basic example">
        <button
          onClick={handleFirstButtonClick}
          type="button"
          className="btn btn-white shadow-none"
          style={{
            backgroundColor: showFirstData ? '#2d42fc' : 'rgba(61, 68, 99, 0.6)',
            color:showFirstData?"white":"white"
          }}
        >
         Traders
        </button>
        <button
          onClick={handleSecondButtonClick}
          type="button"
          className="btn btn-white shadow-none"
          style={{
            backgroundColor: !showFirstData ? "#2d42fc" : "rgba(61, 68, 99, 0.6)",
            color:!showFirstData?"white":"white"
          }}
        >
         Affiliates
        </button>
      </div>
      <div className="card dico m-auto mt-5" style={{ width: "30rem" }}>
        {showFirstData ? (
          <div className="card-body">
            <div className="text-center">
              <h4>Enter Referral Code</h4>
              <h6 className="my-3">
                Please input a referral code to benefit from fee discounts.
              </h6>
              <button
                onClick={handleSecondButtonClick}
                className="btn btn-primary w-100 my-3"
              >
                Connect wallet
              </button>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="text-center">
              <h4>Generate Referral Code</h4>
              <h6 className="my-3">
                Looks like you don't have a referral code to share. Create one
                now and start earning rebates!
              </h6>
              <button
                onClick={handleSecondButtonClick}
                className="btn btn-primary w-100 my-3"
              >
                Connect wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Referrals;
