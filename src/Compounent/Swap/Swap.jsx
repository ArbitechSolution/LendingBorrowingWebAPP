import React, { useState, useEffect } from "react";
import "./Swap.css";
import SwapIcon from "@mui/icons-material/SwapHoriz";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

// // Import the PancakeSwap SDK
// import { PancakeSwap } from '@pancakeswap-libs/sdk';

import {
  LendingAbi,
  LendingAddress,
  BUSDTokenAbi,
  BUSDTokenAddress,
  swapAbi,
  swapAddress,
  factoryAbi,
  factoryAddress,
  TokenAddress,
  UsdcAddress,
  UsdcAbi,
  MaticAddress,
  MaticAbi,
  XrpAddress,
  XrpAbi,
  EthAddress,
  EthAbi,
  AdaAddress,
  AdaAbi,
  TronAddress,
  TronAbi,
  UsdtAddress,
  UsdtAbi,
  DogeAddress,
  DogeAbi,
  TokenAbi,
} from "../../utils/Contracts";

const renderValue = (valueProps, tokenData) => {
  const { value } = valueProps;
  const selectedData = tokenData.find((data) => data.name === value);

  return (
    <React.Fragment>
      <Avatar size="sm" src={selectedData?.img} className="me-2" />
      {value}
    </React.Fragment>
  );
};

function Swap() {
  let acc = useSelector((state) => state.connect?.connection);
  let web3 = useSelector((state) => state.connect?.web3);

  const [slippage, setSlippage] = useState(0.5);
  const [swapButtonDisabled, setSwapButtonDisabled] = useState(true);
  const [tokenData, setTokenData] = useState([
    {
      name: "BNB",
      img: "https://assets.pancakeswap.finance/web/native/97.png",
      balance: undefined,
    },
    // {
    //   name: "BUSD",
    //   img: "https://tokens.pancakeswap.finance/images/symbol/busd.png",
    //   balance: undefined,
    // },
    // {
    //   name: "USDT",
    //   img: "https://tokens.pancakeswap.finance/images/symbol/usdt.png",
    //   balance: undefined,
    // },
    // {
    //   name: "ETH",
    //   img: "https://pancakeswap.finance/images/tokens/0x2170Ed0880ac9A755fd29B2688956BD959F933F8.png",
    //   balance: undefined,
    // },
    // {
    //   name: "USDC",
    //   img: "https://tokens.pancakeswap.finance/images/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d.png",
    //   balance: undefined,
    // },
    // {
    //   name: "XRP",
    //   img: "https://tokens.pancakeswap.finance/images/0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE.png",
    //   balance: undefined,
    // },
    // {
    //   name: "ADA",
    //   img: "https://tokens.pancakeswap.finance/images/0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47.png",
    //   balance: undefined,
    // },
    // {
    //   name: "DOGE",
    //   img: "https://tokens.pancakeswap.finance/images/0xbA2aE424d960c26247Dd6c32edC70B295c744C43.png",
    //   balance: undefined,
    // },
    // {
    //   name: "MATIC",
    //   img: "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912",
    //   balance: undefined,
    // },
    // {
    //   name: "TRX",
    //   img: "https://assets.coingecko.com/coins/images/15468/thumb/NxLfA-LK_400x400.png?1620915726",
    //   balance: undefined,
    // },
    {
      name: "AFT",
      img: "https://placeimg.com/60/60/any",
      balance: undefined,
    },
  ]);

  const [fromInputData, setFromInputData] = useState({
    amount: "0",
    name: "BNB",
    balance: undefined,
  });

  const [toInputData, setToInputData] = useState({
    amount: "0",
    name: "AFT",
    balance: undefined,
  });

  const [percentages, setPercentages] = useState([
    { id: 1, name: "25%", value: 25, active: false },
    { id: 2, name: "50%", value: 50, active: false },
    { id: 3, name: "75%", value: 75, active: false },
    { id: 4, name: "MAX", value: 100, active: false },
  ]);

  const getAllTokensData = async () => {
    if (acc === "Connect Wallet") return;

    try {
      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      // const BUSDContractOf = new web3.eth.Contract(
      //   BUSDTokenAbi,
      //   BUSDTokenAddress,
      // );

      // const USDTContractOf = new web3.eth.Contract(UsdtAbi, UsdtAddress);
      // const ETHContractOf = new web3.eth.Contract(EthAbi, EthAddress);
      // const USDCContractOf = new web3.eth.Contract(UsdcAbi, UsdcAddress);
      // const XRPContractOf = new web3.eth.Contract(XrpAbi, XrpAddress);
      // const ADAContractOf = new web3.eth.Contract(AdaAbi, AdaAddress);
      // const DOGEContractOf = new web3.eth.Contract(DogeAbi, DogeAddress);
      // const MATICContractOf = new web3.eth.Contract(MaticAbi, MaticAddress);
      // const TRXContractOf = new web3.eth.Contract(TronAbi, TronAddress);
      const AFTContractOf = new web3.eth.Contract(TokenAbi, TokenAddress);

      const addressList = await lendingContract.methods
        .getAllTokenAddresses()
        .call();

      // set address in tokenData state
      setTokenData((prev) => {
        return prev.map((item, index) => {
          if (item.name === "AFT") return { ...item, address: TokenAddress };
          return { ...item, address: addressList[index] };
        });
      });

      // balance of BNB
      const bnbBalance = await web3.eth.getBalance(acc);
      // const busdBalance = await BUSDContractOf.methods.balanceOf(acc).call();
      // const usdtBalance = await USDTContractOf.methods.balanceOf(acc).call();
      // const ethBalance = await ETHContractOf.methods.balanceOf(acc).call();
      // const usdcBalance = await USDCContractOf.methods.balanceOf(acc).call();
      // const xrpBalance = await XRPContractOf.methods.balanceOf(acc).call();
      // const adaBalance = await ADAContractOf.methods.balanceOf(acc).call();
      // const dogeBalance = await DOGEContractOf.methods.balanceOf(acc).call();
      // const maticBalance = await MATICContractOf.methods.balanceOf(acc).call();
      // const trxBalance = await TRXContractOf.methods.balanceOf(acc).call();
      const aftBalance = await AFTContractOf.methods.balanceOf(acc).call();

      // set balance in tokenData state
      setTokenData((prev) => {
        return prev.map((item) => {
          if (item.name === "BNB") {
            return { ...item, balance: web3.utils.fromWei(bnbBalance) };
          }
          // else if (item.name === "BUSD") {
          //   return { ...item, balance: web3.utils.fromWei(busdBalance) };
          // } else if (item.name === "USDT") {
          //   return { ...item, balance: web3.utils.fromWei(usdtBalance) };
          // } else if (item.name === "ETH") {
          //   return { ...item, balance: web3.utils.fromWei(ethBalance) };
          // } else if (item.name === "USDC") {
          //   return { ...item, balance: web3.utils.fromWei(usdcBalance) };
          // } else if (item.name === "XRP") {
          //   return { ...item, balance: web3.utils.fromWei(xrpBalance) };
          // } else if (item.name === "ADA") {
          //   return { ...item, balance: web3.utils.fromWei(adaBalance) };
          // } else if (item.name === "DOGE") {
          //   return { ...item, balance: web3.utils.fromWei(dogeBalance) };
          // } else if (item.name === "MATIC") {
          //   return { ...item, balance: web3.utils.fromWei(maticBalance) };
          // } else if (item.name === "TRX") {
          //   return { ...item, balance: web3.utils.fromWei(trxBalance) };
          // }
          else if (item.name === "AFT") {
            return { ...item, balance: web3.utils.fromWei(aftBalance) };
          }
        });
      });

      switch (fromInputData.name) {
        case "BNB":
          setFromInputData((prev) => {
            return { ...prev, balance: web3.utils.fromWei(bnbBalance) };
          });
          break;
        // case "BUSD":
        //   setFromInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(busdBalance) };
        //   });
        //   break;
        // case "USDT":
        //   setFromInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(usdtBalance) };
        //   });
        //   break;
        // case "ETH":
        //   setFromInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(ethBalance) };
        //   });
        //   break;
        // case "USDC":
        //   setFromInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(usdcBalance) };
        //   });
        //   break;
        // case "XRP":
        //   setFromInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(xrpBalance) };
        //   });
        //   break;
        // case "ADA":
        //   setFromInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(adaBalance) };
        //   });
        //   break;
        // case "DOGE":
        //   setFromInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(dogeBalance) };
        //   });
        //   break;
        // case "MATIC":
        //   setFromInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(maticBalance) };
        //   });
        //   break;
        // case "TRX":
        //   setFromInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(trxBalance) };
        //   });
        //   break;
        case "AFT":
          setFromInputData((prev) => {
            return { ...prev, balance: web3.utils.fromWei(aftBalance) };
          });
          break;
        default:
          setFromInputData((prev) => {
            return { ...prev, balance: web3.utils.fromWei(bnbBalance) };
          });
      }

      switch (toInputData.name) {
        case "BNB":
          setToInputData((prev) => {
            return { ...prev, balance: web3.utils.fromWei(bnbBalance) };
          });
          break;
        // case "BUSD":
        //   setToInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(busdBalance) };
        //   });
        //   break;
        // case "USDT":
        //   setToInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(usdtBalance) };
        //   });
        //   break;
        // case "ETH":
        //   setToInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(ethBalance) };
        //   });
        //   break;
        // case "USDC":
        //   setToInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(usdcBalance) };
        //   });
        //   break;
        // case "XRP":
        //   setToInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(xrpBalance) };
        //   });
        //   break;
        // case "ADA":
        //   setToInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(adaBalance) };
        //   });
        //   break;
        // case "DOGE":
        //   setToInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(dogeBalance) };
        //   });
        //   break;
        // case "MATIC":
        //   setToInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(maticBalance) };
        //   });
        //   break;
        // case "TRX":
        //   setToInputData((prev) => {
        //     return { ...prev, balance: web3.utils.fromWei(trxBalance) };
        //   });
        //   break;
        case "AFT":
          setToInputData((prev) => {
            return { ...prev, balance: web3.utils.fromWei(aftBalance) };
          });
          break;
        default:
          setToInputData((prev) => {
            return { ...prev, balance: web3.utils.fromWei(bnbBalance) };
          });
      }

      // const tokens = [
      //   "BNB",
      //   "BUSD",
      //   "USDT",
      //   "ETH",
      //   "USDC",
      //   "XRP",
      //   "ADA",
      //   "DOGE",
      //   "MATIC",
      //   "TRX",
      //   "AFT",
      // ];

      // setFromInputData((prev) => {
      //   return {
      //     ...prev,
      //     address: addressList[tokens.indexOf(prev.name)],
      //   };
      // });

      // setToInputData((prev) => {
      //   return {
      //     ...prev,
      //     address: addressList[tokens.indexOf(prev.name)],
      //   };
      // });

      setFromInputData((prev) => {
        return {
          ...prev,
          address: addressList[0],
        };
      });

      setToInputData((prev) => {
        return {
          ...prev,
          address: TokenAddress,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFromChange = async (value) => {
    setFromInputData((prev) => {
      return { ...prev, amount: value };
    });
  };

  const handleFromSelectChange = async (value) => {
    // filter name= value from tokenData
    const selectedItem = tokenData.find((item) => item.name === value);

    setFromInputData((prev) => {
      return {
        ...prev,
        name: selectedItem.name,
        balance: selectedItem.balance,
        address: selectedItem.address,
      };
    });
  };

  const handleToSelectChange = async (value) => {
    // filter name= value from tokenData
    const selectedItem = tokenData.find((item) => item.name === value);

    setToInputData((prev) => {
      return {
        ...prev,
        name: selectedItem.name,
        address: selectedItem.address,
        balance: selectedItem.balance,
      };
    });
  };

  const [isSpinning, setIsSpinning] = useState(false);

  // Function to handle the swap button click
  const handleSwap = () => {
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
    }, 500);

    // set toInputData to fromInputData

    if (fromInputData.name === "BNB") setSlippage(1.5);
    else setSlippage(0.5);

    setFromInputData((prev) => {
      return {
        ...prev,
        name: toInputData.name,
        address: toInputData.address,
        balance: toInputData.balance,
        amount: toInputData.amount,
      };
    });

    // set fromInputData to toInputData
    setToInputData((prev) => {
      return {
        ...prev,
        name: fromInputData.name,
        address: fromInputData.address,
        balance: fromInputData.balance,
      };
    });
  };

  const handlePercentage = (item) => {
    setPercentages((prev) => {
      return prev.map((data) => {
        if (data.id === item.id) {
          return { ...data, active: true };
        } else {
          return { ...data, active: false };
        }
      });
    });

    setFromInputData((prev) => {
      return {
        ...prev,
        amount: (
          (parseFloat(prev.balance) * parseFloat(item.value)) /
          100
        ).toString(),
      };
    });
  };

  const executeSwapETHForTokensWithFee = async () => {
    const swapContract = new web3.eth.Contract(swapAbi, swapAddress);
    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
      const path = [fromInputData.address, toInputData.address];

      console.log("Slippage %", slippage / 100);
      const amountOutMin = web3.utils.toWei(
        (parseFloat(toInputData.amount) * (1 - slippage / 100)).toString(),
      );

      console.log("amountOutMin", amountOutMin);

      const tx = await swapContract.methods
        .swapExactETHForTokensSupportingFeeOnTransferTokens(
          amountOutMin,
          path,
          acc,
          deadline,
        )
        .send({
          from: acc,
          value: web3.utils.toWei(fromInputData.amount.toString()),
        });

      if (tx) {
        toast.success("Swap Success");
        setFromInputData((prev) => {
          return { ...prev, amount: "0" };
        });
      } else toast.error("Swap Failed");
    } catch (error) {
      console.error("Error executing swap:", error);
    }
  };

  const swapExactTokensForETHSupportingFeeOnTransferTokens = async () => {
    const swapContract = new web3.eth.Contract(swapAbi, swapAddress);

    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
      const path = [fromInputData.address, toInputData.address];

      console.log("Slippage %", slippage / 100);

      const amountOutMin = web3.utils.toWei(
        (parseFloat(toInputData.amount) * (1 - slippage / 100)).toFixed(18).toString(),
      );

      console.log("amountOutMin", amountOutMin);

      const tx = await swapContract.methods

        .swapExactTokensForETHSupportingFeeOnTransferTokens(
          web3.utils.toWei(fromInputData.amount),
          amountOutMin,
          path,
          acc,
          deadline,
        )

        .send({ from: acc });

      if (tx) {
        toast.success("Swap Success");
        setFromInputData((prev) => {
          return { ...prev, amount: "0" };
        });
      } else toast.error("Swap Failed");
    } catch (error) {
      console.error("Error executing swap:", error);
    }
  };

  const handleSwaping = async () => {
    if (acc === "Connect Wallet") return;

    try {
      const AFTContractOf = new web3.eth.Contract(TokenAbi, TokenAddress);

      if (fromInputData.name === "AFT") {
        //approve
        const approvalSuccess = await AFTContractOf.methods
          .approve(swapAddress, web3.utils.toWei(fromInputData.amount))
          .send({ from: acc });

        if (approvalSuccess) {
          toast.success("Approval Success");
          swapExactTokensForETHSupportingFeeOnTransferTokens(); // This function should handle swaps for tokens that aren't BNB/ETH
        } else {
          toast.error("Approval Failed");
        }
      } else {
        executeSwapETHForTokensWithFee();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePrice = async () => {
    if (acc === "Connect Wallet" || !web3) return;

    // check if the value is 0 or 0.0 or 0.00 or 0.000 like these then return ;
    if (
      fromInputData.amount.trim() === "" ||
      parseFloat(fromInputData.amount) <= 0 ||
      (fromInputData.amount.split(".")[0] === "0" &&
        parseFloat(fromInputData.amount.split(".")[1]) < 0)
    ) {
      setToInputData((prev) => {
        return {
          ...prev,
          amount: "0",
        };
      });
      return;
    }

    // Define the input and output tokens
    const tokenA = fromInputData.address;
    const tokenB = toInputData.address;

    console.log(typeof tokenA, "tokenA", tokenA);
    console.log(typeof tokenB, "tokenB", tokenB);

    if (fromInputData.name === "BNB") {
    }

    try {
      const factoryContract = new web3.eth.Contract(factoryAbi, factoryAddress);
      const swapContract = new web3.eth.Contract(swapAbi, swapAddress);

      const pairAddress = await factoryContract.methods
        .getPair(tokenA, tokenB)
        .call();
      let result = Boolean(pairAddress);

      if (!result) console.log("Pair does not exist!");

      const amounts = await swapContract.methods
        .getAmountsOut(web3.utils.toWei(fromInputData.amount), [tokenA, tokenB])
        .call();

      setToInputData((prev) => {
        return {
          ...prev,
          amount: web3.utils.fromWei(amounts[1]),
        };
      });
    } catch (error) {
      console.error("Something went wrong", error);
      return false;
    }
  };

  const SwapButtonStatus = () => {
    if (
      fromInputData.amount <= 0 ||
      fromInputData.amount.trim() === "" ||
      fromInputData.amount === undefined ||
      fromInputData.amount > fromInputData.balance
    ) {
      setSwapButtonDisabled(true);
      return;
    } else {
      setSwapButtonDisabled(false);
    }
  };

  useEffect(() => {
    getAllTokensData();
    // SwapButtonStatus();
  }, [acc]);

  useEffect(() => {
    calculatePrice();
  }, [fromInputData.amount, fromInputData.name, toInputData.name]);

  return (
    <div className="pb-5 px-md-5 px-2" style={{ marginTop: "140px" }}>
      <h2>Swap</h2>
      <div className="row">
        <div className="col-md-5 mx-auto col-sm-12">
          <div className="card colorsa">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <label>From</label>
                <div className="">
                  <span className="w-balance">Balance : </span>
                  <span className="w-balance">
                    {fromInputData.balance
                      ? fromInputData.balance.includes(".")
                        ? fromInputData.balance
                            .split(".")
                            .map((part, i) =>
                              i === 1 ? part.slice(0, 2) : part,
                            )
                            .join(".")
                        : fromInputData.balance
                      : "-"}
                  </span>
                </div>
              </div>
              <div
                className="d-flex flex-column align-items-end hana py-3 px-2"
                style={{ backgroundColor: "#1E2559" }}
              >
                <input
                  type="number"
                  className="w-100 hana bg-transparent"
                  value={fromInputData.amount}
                  onChange={(e) => {
                    if (e.target.value < 0) return;
                    handleFromChange(e.target.value);
                  }}
                  placeholder="0.0"
                  onKeyDown={(e) =>
                    e.key === "ArrowUp" || e.key === "ArrowDown"
                      ? e.preventDefault()
                      : null
                  }
                />
                <div className="d-flex align-items-center my-1">
                  <Select
                    className="selection"
                    color="neutral"
                    variant="solid"
                    slotProps={{
                      listbox: {
                        sx: {
                          "--ListItemDecorator-size": "44px",
                        },
                      },
                    }}
                    sx={{
                      "--ListItemDecorator-size": "44px",
                      minWidth: 225,
                    }}
                    defaultValue="BNB"
                    renderValue={(value) => renderValue(value, tokenData)}
                    onChange={(e, value) => handleFromSelectChange(value)}
                    value={fromInputData.name}
                  >
                    {tokenData.map((data, index) => (
                      <Option
                        className="options"
                        key={data.name}
                        value={data.name}
                        label={data.name}
                      >
                        <Avatar size="sm" src={data.img} className="me-2" />
                        {data.name}
                        {data.balance ? (
                          <Chip size="sm" className="chip rounded">
                            {data.balance.includes(".")
                              ? data.balance
                                  .split(".")
                                  .map((part, i) =>
                                    i === 1 ? part.slice(0, 2) : part,
                                  )
                                  .join(".")
                              : data.balance}
                          </Chip>
                        ) : (
                          <div
                            className="spinner-border text-light ms-auto"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  {percentages.map((item) => (
                    <button
                      className={`max ${item.active ? "active" : ""}`}
                      key={item.id}
                      onClick={() => handlePercentage(item)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={`swap-btn ${isSpinning ? "spin" : ""}`}
                type="button"
                data-testid="switch-tokens-button"
                onClick={handleSwap}
              >
                <SwapIcon className="swap-icon" />
              </button>

              <div className="d-flex justify-content-between mb-2">
                <label>To</label>
                <div className="">
                  <span className="w-balance">Balance : </span>
                  <span className="w-balance">
                    {toInputData.balance
                      ? toInputData.balance.includes(".")
                        ? toInputData.balance
                            .split(".")
                            .map((part, i) =>
                              i === 1 ? part.slice(0, 2) : part,
                            )
                            .join(".")
                        : toInputData.balance
                      : "-"}
                  </span>
                </div>
              </div>
              <div
                className="d-flex flex-column align-items-end hana py-3 px-2"
                style={{ backgroundColor: "#1E2559" }}
              >
                <input
                  type="number"
                  className="w-100 hana bg-transparent"
                  value={toInputData.amount}
                  placeholder="0.0"
                  onChange={(e) => {
                    if (e.target.value < 0) return;
                    setToInputData({ amount: e.target.value });
                  }}
                />
                <div className="d-flex align-items-center my-1">
                  <Select
                    className="selection"
                    color="neutral"
                    variant="solid"
                    slotProps={{
                      listbox: {
                        sx: {
                          "--ListItemDecorator-size": "44px",
                        },
                      },
                    }}
                    sx={{
                      "--ListItemDecorator-size": "44px",
                      minWidth: 225,
                    }}
                    defaultValue="AFT"
                    renderValue={(value) => renderValue(value, tokenData)}
                    onChange={(e, value) => handleToSelectChange(value)}
                    value={toInputData.name}
                  >
                    {tokenData.map((data, index) => (
                      <Option
                        key={data.name}
                        value={data.name}
                        label={data.name}
                        className="options"
                      >
                        <Avatar size="sm" className="me-2" src={data.img} />
                        <Box component="span" sx={{ display: "block" }}>
                          <Typography component="span" sx={{ color: "white" }}>
                            {data.name}
                          </Typography>
                        </Box>
                        {data.balance ? (
                          <Chip size="sm" className="chip rounded">
                            {data.balance.includes(".")
                              ? data.balance
                                  .split(".")
                                  .map((part, i) =>
                                    i === 1 ? part.slice(0, 2) : part,
                                  )
                                  .join(".")
                              : data.balance}
                          </Chip>
                        ) : (
                          <div
                            className="spinner-border text-light ms-auto"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="row mt-3">
                <div
                  className="col text-start"
                  style={{
                    color: "#0C6EFD",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  Price
                </div>
                <div className="col text-end w-balance">0</div>
              </div>

              <div className="row mt-2">
                <div
                  className="col text-start"
                  style={{
                    color: "#0C6EFD",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  Slippage Tolerence
                  <FaEdit className="ms-2 mb-1" color="#aaa" />
                </div>
                <div className="col text-end w-balance">{slippage}%</div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row px-4">
                <button
                  // className={`col-12 swap-button ${
                  //   swapButtonDisabled ? "btn-disabled" : ""
                  // } `}
                  className="col-12 swap-button mb-2"
                  onClick={handleSwaping}
                  // disabled={swapButtonDisabled}
                >
                  Swap
                </button>
              </div>
            </div>
            {/* <div className="card-footer">
              <div className="p-1 row">
                <div className="col-6 text-start w-balance">
                  Minimum received
                </div>
                <div className="col-6 text-end w-balance">0.197 BUSD</div>
              </div>
              <div className="p-1 row">
                <div className="col-6 text-start w-balance">Price Impact</div>
                <div className="col-6 text-end w-balance">0.01%</div>
              </div>
              <div className="p-1 row">
                <div className="col-6 text-start w-balance">Trading Fee</div>
                <div className="col-6 text-end w-balance">0.0000005 BNB</div>
              </div>
              <div className="p-1 row">
                <div className="col-6 text-start w-balance">Route</div>
                <div className="col-6 text-end w-balance">{`BNB > BUSD`}</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
