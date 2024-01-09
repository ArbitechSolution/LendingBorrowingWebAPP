import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import React, { useState, useEffect } from "react";

function CountrySelect({ phone, handleChange }) {
  const [value, setValue] = useState(phone || "");
  
  useEffect(() => {
    setValue(phone);
  }, [phone]);

  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={(value) => {
        handleChange("phone", value);
        setValue(value);
      }}
      className="phoneInput"
      countrySelectProps={{
        style: {
          backgroundColor: "#1B2155 !important",
        },
      }}
    />
  );
}

export default CountrySelect;
