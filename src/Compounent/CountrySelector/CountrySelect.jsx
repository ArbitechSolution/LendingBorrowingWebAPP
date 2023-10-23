import React, { useState, useMemo } from "react";
import countryList from "react-select-country-list";
import { Select, Option } from "@mui/joy";

function CountrySelector({ country }) {
  const option = {
    value: "Select",
    label: "Select Country",
  };

  const [value, setValue] = useState(country || option.label);

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <Select
      className="selection"
      color="neutral"
      variant="solid"
      onChange={(e, value) => changeHandler(value)}
      defaultValue={value}
      sx={{
        backgroundColor: "#1B2155 !important",
        "&:hover": {
          backgroundColor: "#1B2155 !important",
        },
      }}
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
          sx={{ width: "100% !important" }}
        >
          {data.label}
        </Option>
      ))}
    </Select>
  );
}

export default CountrySelector;
