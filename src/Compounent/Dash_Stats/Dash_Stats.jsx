import React, { useState, useEffect } from "react";
import "./Dash_Stats.css";
import { toast } from "react-toastify";
import {
  Select,
  Avatar,
  Box,
  Typography,
  Option,
  ListItemDecorator,
} from "@mui/joy";
import {
  TokenAddress,
  TokenAbi,
  StakingAddress,
  StakingAbi,
  LendingAddress,
  LendingAbi,
  BUSDTokenAddress,
  BUSDTokenAbi,
  redeemRewardAddress,
  redeemRewardAbi,
} from "../../utils/Contracts";
import { useSelector } from "react-redux";
function Dash_Stats() {
  let acc = useSelector((state) => state.connect?.connection);
  let web3 = useSelector((state) => state.connect?.web3);

  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [feeBalance, setFeeBalance] = useState("");
  const [calculatedValue, setCalculatedValue] = useState("");
  const [tokenData, setTokenData] = useState([
    {
      name: "BNB",
      img: "https://assets.pancakeswap.finance/web/native/97.png",
    },
    {
      name: "BUSD",
      img: "https://tokens.pancakeswap.finance/images/symbol/busd.png",
    },
    {
      name: "USDT",
      img: "https://tokens.pancakeswap.finance/images/symbol/usdt.png",
    },
    {
      name: "ETH",
      img: "https://pancakeswap.finance/images/tokens/0x2170Ed0880ac9A755fd29B2688956BD959F933F8.png",
    },
    {
      name: "USDC",
      img: "https://tokens.pancakeswap.finance/images/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d.png",
    },
    {
      name: "XRP",
      img: "https://tokens.pancakeswap.finance/images/0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE.png",
    },
    {
      name: "ADA",
      img: "https://tokens.pancakeswap.finance/images/0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47.png",
    },
    {
      name: "DOGE",
      img: "https://tokens.pancakeswap.finance/images/0xbA2aE424d960c26247Dd6c32edC70B295c744C43.png",
    },
    {
      name: "MATIC",
      img: "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912",
    },
    {
      name: "TRX",
      img: "https://assets.coingecko.com/coins/images/15468/thumb/NxLfA-LK_400x400.png?1620915726",
    },
  ]);

  const handleInputChange = (newValue, setFunc) => {
    if (newValue < 0) {
      // Do not set the state if the value is less than 0
      return;
    }

    if (newValue.startsWith("0") && newValue.length > 1) {
      newValue = newValue.replace(/^0+/, "");
    }

    setFunc(newValue);
  };

  const [selectedCollateralToken, setSelectedCollateralToken] = useState({
    name: "BNB",
    img: "url_to_bnb_image_1",
    address: "",
  });

  const [selectedBorrowToken, setSelectedBorrowToken] = useState({
    name: "BNB",
    img: "url_to_busd_image_1",
    address: "",
  });

  const handleCollateralTokenChange = (name) => {
    const token = tokenData.find((data) => data.name === name);
    setSelectedCollateralToken((prev) => ({ ...prev, ...token }));
  };

  const handleBorrowTokenChange = (name) => {
    const token = tokenData.find((data) => data.name === name);
    setSelectedBorrowToken(token);
  };

  const getAllTokenAddress = async () => {
    try {
      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      const addressList = await lendingContract.methods
        .getAllTokenAddresses()
        .call();

      // set address in tokenData state
      setTokenData((prev) => {
        return prev.map((item, index) => {
          return { ...item, address: addressList[index] };
        });
      });

      setSelectedCollateralToken((prev) => {
        return { ...prev, address: addressList[0] };
      });

      setSelectedBorrowToken((prev) => {
        return { ...prev, address: addressList[0] };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const calculateFeeBalance = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please Connect Wallet");
        return;
      }
      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const redeemRewardContract = new web3.eth.Contract(
        redeemRewardAbi,
        redeemRewardAddress,
      );

      const feeBalance = await redeemRewardContract.methods
        .contractFeeBalance()
        .call({ from: acc });

      setFeeBalance(feeBalance);
    } catch (err) {
      console.log(err);
    }
  };

  const calculateBorrowableAmount = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please Connect Wallet");
        return;
      }
      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      const borrowableAmount = await lendingContract.methods
        .calculateBorrowableAmount(
          web3.utils.toWei(amount),
          selectedCollateralToken.address,
          selectedBorrowToken.address,
        )
        .call({ from: acc });

      if (borrowableAmount) {
        setCalculatedValue(web3.utils.fromWei(borrowableAmount));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const contractData = async () => {
    try {
      const stakingContractOf = new web3.eth.Contract(
        StakingAbi,
        StakingAddress,
      );

      const contract_data = await stakingContractOf.methods
        .checkContractData()
        .call({ from: acc });

      setData(contract_data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAssetsBalance = async () => {
    try {
      if (acc === "Connect Wallet") return;

      let lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      const assetsBalance = await lendingContract.methods
        .calculateTotalContractBalanceOfEachToken()
        .call({ from: acc });

      // loop over assetsBalance[1] and set balance in tokenData state
      setTokenData((prev) => {
        return prev.map((item, index) => {
          return { ...item, balance: assetsBalance[1][index] };
        });
      });

      let prices = [];
      // loop over tokenData and get live price of each token
      for (let i = 0; i < assetsBalance[0].length; i++) {
        const price = await lendingContract.methods
          .getLivePrice(assetsBalance[0][i])
          .call({ from: acc });
        prices.push(price);
      }

      // loop over tokenData and set live price of each token
      setTokenData((prev) => {
        return prev.map((item, index) => {
          return { ...item, price: prices[index] };
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (acc === "Connect Wallet") return;
    getAllTokenAddress();
    contractData();
    calculateFeeBalance();
    getAssetsBalance();
  }, [acc]);

  console.log(data);
  console.log(feeBalance);

  return (
    <div className="px-md-5 px-2 my-2">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-6 col-sm-12 mt-2">
          <div className="row">
            <div className="col-md-12 col-sm-12 mt-2">
              <div className="card color">
                <div className="card-body">
                  <h6>Stats</h6>
                  <hr />
                  <div className="row px-2">
                    <div className="col AUM">Total Fees</div>
                    <div className="col text-end AUM">
                      {feeBalance ? web3.utils.fromWei(feeBalance) : "-"}
                    </div>
                  </div>
                  <div className="row px-2">
                    <div className="col AUM">Total Staked</div>
                    <div className="col text-end AUM">
                      {data[1] ? web3.utils.fromWei(data[1]) : "-"}
                    </div>
                  </div>
                  <div className="row px-2">
                    <div className="col AUM">Total Users</div>
                    <div className="col text-end AUM">
                      {data[0] ? data[0] : "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12 mt-4">
              <div className="card color">
                <div className="card-body">
                  <h6>Calculate Stats</h6>
                  <hr />
                  <div className="row my-2">
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ gap: "12px " }}
                    >
                      <label>Amount</label>
                      <input
                        type="number"
                        className="py-2 px-2 wd"
                        placeholder="Amount"
                        value={amount || 0}
                        onChange={(e) =>
                          handleInputChange(e.target.value, setAmount)
                        }
                      />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <label>Collateral Token</label>
                      <Select
                        value={selectedCollateralToken.name}
                        sx={{
                          // minWidth:198,
                          color: "white",
                          borderStyle: "none",
                          backgroundColor: "rgb(30,37,89)",
                          "&:hover": {
                            backgroundColor: "rgba(30,37,89,0.9)",
                            color: "white",
                          },
                        }}
                        className="wd"
                      >
                        {tokenData.map((data, index) => (
                          <Option
                            key={data.name}
                            value={data.name}
                            label={data.name}
                            onClick={() =>
                              handleCollateralTokenChange(data.name)
                            }
                          >
                            <ListItemDecorator>
                              <Avatar size="sm" src={data.img} />
                            </ListItemDecorator>
                            <Box component="span" sx={{ display: "block" }}>
                              <Typography component="span">
                                {data.name}
                              </Typography>
                            </Box>
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <label>Borrow Token</label>
                      <Select
                        value={selectedBorrowToken.name}
                        sx={{
                          // minWidth: 198,
                          color: "white",
                          borderStyle: "none",
                          backgroundColor: "rgb(30,37,89)",
                          "&:hover": {
                            backgroundColor: "rgba(30,37,89,0.9)",
                            color: "white",
                          },
                        }}
                        className="wd"
                      >
                        {tokenData.map((data, index) => (
                          <Option
                            key={data.name}
                            value={data.name}
                            label={data.name}
                            onClick={() => handleBorrowTokenChange(data.name)}
                          >
                            <ListItemDecorator>
                              <Avatar size="sm" src={data.img} />
                            </ListItemDecorator>
                            <Box component="span" sx={{ display: "block" }}>
                              <Typography component="span">
                                {data.name}
                              </Typography>
                            </Box>
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <label>Calculated Value</label>
                      <div>
                        {calculatedValue ? calculatedValue : "No Result"}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col text-end">
                      <button
                        className="btn batan"
                        onClick={calculateBorrowableAmount}
                      >
                        Calculate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 mt-2">
          <div className="card color">
            <div
              className="card-body"
              //  style={{
              //   boxShadow:"100px -25px 270px skyblue",
              //   }}
            >
              <h6>Assets Balance</h6>
              <hr />
              {tokenData.map((data, index) => (
                <div className="row my-2" key={index}>
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                      paddingBottom:
                        index === tokenData.length - 1 ? "0px" : "5px",
                      borderBottomWidth: index === tokenData.length - 1 ? 0 : 1,
                    }}
                  >
                    <div style={{ width: "30%" }}>
                      <img src={data.img} alt={data.name} width="34px" />
                      <label style={{ marginLeft: "5px" }}>{data.name}</label>
                    </div>
                    <div style={{ widh: "30%", textAlign: "left" }}>
                      {data.price
                        ? `$${(data.price / 10 ** 8).toFixed(2)}`
                        : "-"}
                    </div>
                    <div
                      style={{
                        width: "40%",
                        textAlign: "right",
                      }}
                    >
                      {data.balance
                        ? // round to 2 decimal places
                          Math.round(web3.utils.fromWei(data.balance) * 100) /
                          100
                        : "-"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash_Stats;
