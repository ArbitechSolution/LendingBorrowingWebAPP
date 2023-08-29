import React, { useState } from "react";
import "./Swap.css";
import svg from "../../image/swap_vert_black_24dp.svg";
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import ListDivider from '@mui/joy/ListDivider';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import drop from "../../image/drop.svg";
import drop2 from "../../image/2.svg";
import drop1 from "../../image/1.png";
import drop3 from "../../image/3.png";
import drop4 from "../../image/4.png";
import drop5 from "../../image/5.png";

function Swap() {
  const people = [
    { name: 'Eric', role: '0' ,img:drop },
    { name: 'Smith', role: '0' ,img:drop1 },
    { name: 'asss', role: '0' ,img:drop2 },
    { name: 'errr', role: '0' ,img:drop3 },
    { name: 'tttt', role: '0' ,img:drop4 },
    { name: 'yyy', role: '0' ,img:drop5 },   
  ];

  const [fromValue, setFromValue] = useState("Eric");
  const [toValue, setToValue] = useState("Smith");
  const [wewe, setWewe] = useState("");

  // Function to handle the swap button click
  const handleSwap = () => {
    // Swap the input values
    const temp = fromValue;
    setFromValue(toValue);
    setToValue(temp);
  };

  return (
    <div className="my-5 px-md-5 px-2">
      <h2>Swap</h2>
      <div className="row">
        <div className="col-md-5 mx-auto col-sm-12">
          <div className="card colorsa">
            <div className="card-body">
              <label>From</label>
              <div className="d-flex  position-relative">
                <input
                  type="number"
                  className="w-100 py-3 px-2 hana"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                />
                <div className="d-flex position_absolute">
                  <Select
                    defaultValue={fromValue}
                    slotProps={{
                      listbox: {
                        sx: {
                          '--ListItemDecorator-size': '48px',
                          minWidth: 340,
                          color: "white",
                      backgroundColor: '#242060',
                      boxShadow:"none",
                      border:"1px solid rgb(0, 3, 48)",
                      borderRadius:"8px",
                    
                        },
                      },
                    }}
                    sx={{
                      minWidth: 100,
                      color: "white",
                      backgroundColor: 'rgba(89, 99, 145, 0.6)',
                      '&:hover': {
                        backgroundColor: 'rgba(89, 99, 145, 0.9)',
                        color: "white",
                      }
                    }}
                    onChange={(e) => setFromValue(e.target.value)}
                  >
                   
                   
                    {people.map((data, index) => (
                      <Option
                        key={data.name}
                        value={data.name}
                        label={data.name}
                        sx={{
                         
                          '&:hover': {
                            backgroundColor: 'rgba(89, 99, 145, 0.9)',
                            color: "white",
                          },
                          '&:focus': {
                            backgroundColor: 'rgba(89, 99, 145, 0.9)',
                            color: "white",
                          }
                        }}
                      >
                        <ListItemDecorator>
                          <Avatar size="sm" src={data.img} />
                        </ListItemDecorator>
                        <Box component="span" sx={{ display: 'block' }}>
                          <Typography component="span"  sx={{ color: 'white' }}>{data.name}</Typography>
                          <Typography level="body4"  sx={{ color: 'white' }}>{data.status}</Typography>
                        </Box>
                        <Chip
                          size="sm"
                          variant="outlined"
                          color="transparent"
                          sx={{
                            ml: 'auto',
                            borderRadius: '2px',
                            minHeight: '20px',
                            paddingInline: '4px',
                            fontSize: 'xs',
                          }}
                        >
                          {data.role}
                        </Chip>
                      </Option>
                    ))}
                  </Select>
                  <button className="btn batan">Max</button>
                </div>
              </div>

              <div className="row py-4">
                <div className="col text-start">Wallet balance</div>
                <div className="col text-end">0 XVS</div>
              </div>

              <button
                className="css-1vkid2m"
                type="button"
                data-testid="switch-tokens-button"
                onClick={handleSwap}
              >
                <img src={svg} alt="" />
              </button>

              <label>To</label>
              <div className="d-flex position-relative">
                <input
                  type="number"
                  className="w-100 py-3 px-2 hana"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                />
                <div className="d-flex position_absolute">
                  <Select
                    defaultValue={toValue}
                    slotProps={{
                      listbox: {
                        sx: {
                          '--ListItemDecorator-size': '48px',
                          minWidth: 240,
                        },
                      },
                    }}
                    sx={{
                      minWidth: 100,
                      color: "white",
                      backgroundColor: 'rgba(89, 99, 145, 0.6)',
                      '&:hover': {
                        backgroundColor: 'rgba(89, 99, 145, 0.9)',
                        color: "white",
                      }
                    }}
                    onChange={(e) => setToValue(e.target.value)}
                  >
                    {people.map((data, index) => (
                      <Option
                        key={data.name}
                        value={data.name}
                        label={data.name}
                      >
                        <ListItemDecorator>
                          <Avatar size="sm" src={data.img} />
                        </ListItemDecorator>
                        <Box component="span" sx={{ display: 'block' }}>
                          <Typography component="span">{data.name}</Typography>
                          <Typography level="body4">{data.status}</Typography>
                        </Box>
                        <Chip
                          size="sm"
                          variant="outlined"
                          color="transparent"
                          sx={{
                            ml: 'auto',
                            borderRadius: '2px',
                            minHeight: '20px',
                            paddingInline: '4px',
                            fontSize: 'xs',
                          }}
                        >
                          {data.role}
                        </Chip>
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="row py-2">
                <div className="col text-start">Wallet balance</div>
                <div className="col text-end">0 {people.name}</div>
              </div>

              <div className="row py-2 mb-2">
                <div className="col text-start">Wallet balance</div>
                <div className="col text-end">0 XVS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
