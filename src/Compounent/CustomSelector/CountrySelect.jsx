import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import { Select, Option } from "@mui/joy";

function CountrySelector({ country, handleChange }) {
  const option = {
    value: "Select",
    label: "Select Country",
  };
  const [value, setValue] = useState(country || option.label);

  const options = useMemo(() => countryList().getData(), []);

  return (
    <Select
      className="selection"
      color="neutral"
      variant="solid"
      name="country"
      sx={{
        width: "100% !important",
        backgroundColor: "#1B2155 !important",
        fontSize: "14px !important",
        "&:hover": {
          backgroundColor: "#1B2155 !important",
        },
      }}
      value={value || option.label}
    >
      <Option
        key={option.value}
        value={option.label}
        label={option.label}
        className="options"
        sx={{ width: "100% !important" }}
      >
        {option.label}
      </Option>
      {options.map((data, index) => (
        <Option
          key={data.value}
          value={data.label}
          label={data.label}
          className="options"
          sx={{ width: "100% !important", borderBottom: "1px solid #1B3160" }}
          onClick={() => {
            handleChange("country", data.label);
            setValue(data.label);
          }}
        >
          {data.label}
        </Option>
      ))}
    </Select>
  );
}

export default CountrySelector;
