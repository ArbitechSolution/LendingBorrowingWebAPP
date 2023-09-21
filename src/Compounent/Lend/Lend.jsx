import React, { useState, useEffect } from "react";
import "./Lend.css";
import {
  TokenAddress,
  TokenAbi,
  StakingAddress,
  StakingAbi,
  LendingAddress,
  LendingAbi,
  BUSDTokenAddress,
  BUSDTokenAbi,
  redeemRewardAbi,
  redeemRewardAddress,
} from "../../utils/Contracts";
import {
  Select,
  Option,
  ListItemDecorator,
  Avatar,
  Box,
  Typography,
} from "@mui/joy";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LendTable from "./LendTable";
import LoanTable from "./LoanTable";

function Lend() {
  let acc = useSelector((state) => state.connect?.connection);
  let web3 = useSelector((state) => state.connect?.web3);
  let url = "https://testnet.bscscan.com/address/";

  const [lenderList, setLenderList] = useState([]);
  const [loanList, setLoanList] = useState([]);
  const [borrowerList, setBorrowerList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [days, setDays] = useState(0);
  const [percentage, setpercentage] = useState(0);
  const [selectedValue, setSelectedValue] = useState("BNB");
  const [selectedTokenAddress, setSelectedTokenAddress] = useState("");
  const [lendID, setLendID] = useState("Select Lend ID");
  const [lend_ID, setLend_ID] = useState("Select Lend ID");
  const [selectedLoanID, setSelectedLoanID] = useState("");
  const [borrowerIdsList, setBorrowerIdsList] = useState([]);
  const [borrowerList2, setBorrowerList2] = useState([]);

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

  const handleValueChange = (name) => {
    setSelectedValue(name);
    const token = tokenData.find((item) => item.name === name);

    const selectedTokenAddress = token.address;

    setSelectedTokenAddress(selectedTokenAddress);
  };

  const setSelectedAddress = (addressList) => {
    switch (selectedValue) {
      case "BNB":
        setSelectedTokenAddress(addressList[0]);
        break;
      case "BUSD":
        setSelectedTokenAddress(addressList[1]);
        break;
      case "USDT":
        setSelectedTokenAddress(addressList[2]);
        break;
      case "ETH":
        setSelectedTokenAddress(addressList[3]);
        break;
      case "USDC":
        setSelectedTokenAddress(addressList[4]);
        break;
      case "XRP":
        setSelectedTokenAddress(addressList[5]);
        break;
      case "ADA":
        setSelectedTokenAddress(addressList[6]);
        break;
      case "DOGE":
        setSelectedTokenAddress(addressList[7]);
        break;
      case "MATIC":
        setSelectedTokenAddress(addressList[8]);
        break;
      case "TRX":
        setSelectedTokenAddress(addressList[9]);
        break;
      default:
        setSelectedTokenAddress(addressList[0]);
        break;
    }
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

      setSelectedAddress(addressList);
    } catch (err) {
      console.log(err);
    }
  };

  const getLendingDetails = async () => {
    try {
      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      const lenderRequests = await lendingContract.methods
        .getLenderRequests(acc)
        .call();

      const lenderDetailsPromises = lenderRequests[0]?.map(async (item, i) => {
        return await lendingContract.methods.getLenderDetails(item).call();
      });
      const lenderDetails = await Promise.all(lenderDetailsPromises);
      setLenderList(lenderDetails);

      const loanDetailsPromises = lenderRequests[0]?.map(async (item, i) => {
        return await lendingContract.methods.getLoanInfo(item).call();
      });
      const loanDetails = await Promise.all(loanDetailsPromises);
      setLoanList(loanDetails);

      // get all loanIDs of the lender
      const ids = [];
      loanDetails.forEach((item) => {
        if (item[0] === true) {
          item["data"].forEach((loan) => {
            ids.push(loan.loanID);
          });
        }
      });

      // console.log("ids", ids)

      const loanIDs = await lendingContract.methods.getLoanIDs(acc).call();

      // map loanIDs to get loan details
      const borrowerInfoPromises = loanIDs?.map(async (loanID) => {
        return await lendingContract.methods.getborrowerInfo(loanID).call();
      });
      const borrowerInfo = await Promise.all(borrowerInfoPromises);
      setBorrowerList(borrowerInfo);

      const borrowerPromises = ids?.map(async (item) => {
        return await lendingContract.methods.getborrowerInfo(item).call();
      });
      const borrower = await Promise.all(borrowerPromises);
      setBorrowerList2(borrower);

      // map on borrowerInfo to get loanIDs where repaymentTime is less than current time
      const borrowerIds = borrower.map((item) => {
        if (item?.["repaymentTime"] < Math.floor(Date.now() / 1000)) {
          return item[0];
        }
      });
      // filter out undefined values
      const borrowerIdsList = borrowerIds.filter((item) => item !== undefined);
      setBorrowerIdsList(borrowerIdsList);
    } catch (err) {
      console.log(err);
    }
  };

  const checkBalanceToPayFee = async () => {
    try {
      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);
      const tokenContract = new web3.eth.Contract(TokenAbi, TokenAddress);
      const BUSDContractOf = new web3.eth.Contract(
        BUSDTokenAbi,
        BUSDTokenAddress,
      );

      const AftBalance = await tokenContract.methods
        .balanceOf(acc)
        .call({ from: acc });

      const BusdBalance = await BUSDContractOf.methods
        .balanceOf(acc)
        .call({ from: acc });

      if (parseFloat(BusdBalance) < parseFloat(amount)) {
        toast.error("Insufficient BUSD balance");
        return false;
      }

      const calculateFees = await lendingContract.methods
        .calculateFeeOnTrading(web3.utils.toWei(amount), days)
        .call();

      console.log("FEes", calculateFees);

      if (calculateFees > AftBalance) {
        toast.error("Insufficient balance to pay fees");
        return false;
      }

      if (parseInt(amount) < 10000) {
        return "skip";
      }

      if (parseInt(days) < 31) {
        return "skip";
      }

      const isApproved = await tokenContract.methods
        // add 1 ether in calculateFees
        .approve(redeemRewardAddress, calculateFees)
        .send({ from: acc });

      if (!isApproved.status) {
        toast.error("AFT Approval Failed");
        return false;
      }

      toast.success("AFT approved Successfully");

      return true;
    } catch (error) {
      console.error("An error occurred:", error);
      return false;
    }
  };

  const lend = async () => {
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
      const stakingContract = new web3.eth.Contract(StakingAbi, StakingAddress);
      const BUSDContractOf = new web3.eth.Contract(
        BUSDTokenAbi,
        BUSDTokenAddress,
      );

      // Check if the user has already staked
      const userDetail = await stakingContract.methods
        .checkUserDetail(acc)
        .call();

      if (userDetail[1] == false) {
        toast.error("Please stake first");
        return;
      }

      // check the input values
      if (amount <= 0 || days <= 0 || percentage <= 0) {
        toast.error("Please enter valid values");
        return;
      }

      if (
        selectedValue === "BNB" ||
        selectedValue === "MATIC" ||
        selectedValue === "ETH" ||
        selectedValue === "TRX" ||
        selectedValue === "XRP" ||
        selectedValue === "ADA"
      ) {
        const balance = await web3.eth.getBalance(acc);
        // balance to ether
        const balanceInEther = web3.utils.fromWei(balance, "ether");

        if (balanceInEther < amount) {
          toast.error("Insufficient BNB balance");
          return;
        }

        const isBalanceCheckPassed = await checkBalanceToPayFee();
        if (!isBalanceCheckPassed) {
          return;
        }

        // create lend request
        const lendRequest = await lendingContract.methods
          .createLendRequest(
            web3.utils.toWei(amount),
            percentage,
            days,
            selectedTokenAddress,
          )
          .send({
            from: acc,
            value: web3.utils.toWei(amount, "ether"),
          });

        if (lendRequest.status) {
          toast.success("Lend request created successfully");
          setDays(0);
          setAmount(0);
          setpercentage(0);

          setTimeout(() => {
            getLendingDetails();
          }, 1000);
        }

        // approve the token
      } else {
        const isBalanceCheckPassed = await checkBalanceToPayFee();

        if (!isBalanceCheckPassed) {
          return;
        }

        // approve the token
        const approve = await BUSDContractOf.methods
          .approve(LendingAddress, web3.utils.toWei(amount))
          .send({
            from: acc,
          });

        if (approve.status) {
          toast.success("Approved successfully");
        }

        const createLendRequest = await lendingContract.methods
          .createLendRequest(
            web3.utils.toWei(amount),
            percentage,
            days,
            selectedTokenAddress,
          )
          .send({
            from: acc,
            value: "0",
          });

        if (createLendRequest.status) {
          toast.success("Lend request created successfully");
          setDays(0);
          setAmount(0);
          setpercentage(0);

          setTimeout(() => {
            getLendingDetails();
          }, 1000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateLendIDStatus = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please Connect Wallet");
        return;
      }
      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }
      // check if lendID
      if (lendID === "Select Lend ID") {
        toast.error("Please select Loan ID");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      let lendItem = lenderList.find((item) => item.requestID == lendID);

      if (!lendItem) {
        toast.error("Invalid ID!");
        return;
      }

      if (lendItem.isOpenToBorrow === false) {
        toast.error("Status Already Updated");
        return;
      }

      const updateStatus = await lendingContract.methods
        .updateRequestStatus(lendID)
        .send({
          from: acc,
        });

      if (updateStatus.status) {
        toast.success("Status Updated Successfully");

        setTimeout(() => {
          getLendingDetails();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const withdrawLendAmount = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please Connect Wallet");
        return;
      }
      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      if (lend_ID === "Select Lend ID") {
        toast.error("Please select Loan ID");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      let lendItem = lenderList.find((item) => item.requestID == lend_ID);

      if (!lendItem) {
        toast.error("Invalid ID!");
        return;
      }

      if (lendItem.isOpenToBorrow === true) {
        toast.error("Please Update Status First");
        return;
      }

      const withdrawAmount = await lendingContract.methods
        .withdrawLendAmount(lend_ID)
        .send({
          from: acc,
        });

      if (withdrawAmount.status) {
        toast.success("Lending Amount Withdraw Successful");
        setTimeout(() => {
          getLendingDetails();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const defaultLoan = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please Connect Wallet");
        return;
      }
      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      if (!selectedLoanID) {
        toast.error("Please select Loan ID");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      const loanItem = loanList.find((item) => {
        return item["data"]?.find((loan) => loan.loanID === selectedLoanID);
      });

      if (!loanItem) {
        toast.error("Invalid Loan ID!");
        return;
      }

      const borrowerItem = borrowerList2.find(
        (borrower) => borrower[0] === selectedLoanID,
      );

      if (borrowerItem?.["repaymentTime"] > Math.floor(Date.now() / 1000)) {
        toast.error("Loan is not Overdue");
        return;
      }

      //  if loan is closed then return
      if (borrowerItem?.["payment"].isClosed === true) {
        toast.error("Loan is already closed");
        return;
      }

      const defaultLoan = await lendingContract.methods
        .defaultLoan(borrowerItem.borrowerAddress, selectedLoanID)
        .send({
          from: acc,
        });

      if (defaultLoan.status) {
        toast.success("Loan Default Successful");
        setTimeout(() => {
          getLendingDetails();
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (acc === "Connect Wallet") return;
    getAllTokenAddress();
    getLendingDetails();
  }, [acc]);

  return (
    <div>
      <div>
        <div className="px-md-5 mt-2 mb-4 px-2">
          <h2>Lend</h2>
          <p>Lend your Assets </p>

          <div className="row pb-4">
            <div className="col-md-4 col-sm-12 mt-2 ">
              <div className="card colorsa">
                <div className="card-body">
                  <h6>Lend</h6>
                  <hr />
                  <div className="row my-2">
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ gap: "12px " }}
                    >
                      <label>Amount</label>
                      <input
                        type="number"
                        className="py-2 px-2"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        name="amount"
                        id="amount"
                      />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ gap: "12px " }}
                    >
                      <label>percentage</label>
                      <input
                        type="number"
                        className="py-2 px-2"
                        placeholder="percentage"
                        name="percentage"
                        id="percentage"
                        value={percentage}
                        onChange={(e) => setpercentage(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ gap: "12px " }}
                    >
                      <label>Days</label>
                      <input
                        type="number"
                        className="py-2 px-2"
                        placeholder="Days"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        name="days"
                        id="days"
                      />
                    </div>
                  </div>
                  <div className="row my-2">
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ gap: "12px " }}
                    >
                      <label>Token</label>
                      <Select
                        value={selectedValue}
                        sx={{
                          minWidth: 198,
                          color: "white",
                          borderStyle: "none",
                          backgroundColor: "rgb(30,37,89)",
                          "&:hover": {
                            backgroundColor: "rgba(30,37,89,0.9)",
                            color: "white",
                          },
                        }}
                      >
                        {tokenData.map((data, index) => (
                          <Option
                            // backgroundColor should be dark
                            key={data.name}
                            value={data.name}
                            label={data.name}
                            onClick={() => handleValueChange(data.name)}
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
                  <hr />
                  <div className="d-flex " style={{ gap: "15px " }}>
                    <button className="btn batan" onClick={lend}>
                      Lend
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 mt-2 ">
              <div className="card colorsa">
                <div className="card-body">
                  <h6>Update Status and Withdraw</h6>
                  <hr />
                  <div className="row my-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <label>Lend ID</label>
                      <Select
                        value={lendID}
                        placeholder="Select Lend ID"
                        sx={{
                          minWidth: 198,
                          color: "white",
                          borderStyle: "none",
                          backgroundColor: "rgb(30,37,89)",
                          "&:hover": {
                            backgroundColor: "rgba(30,37,89,0.9)",
                            color: "white",
                          },
                        }}
                      >
                        {lenderList.length ? (
                          lenderList.every(
                            (item) => item.isOpenToBorrow === false,
                          ) ? (
                            <Option
                              style={{ cursor: "pointer", padding: "0 10px" }}
                            >
                              <Box component="span" sx={{ display: "block" }}>
                                <Typography component="span" fontSize={14}>
                                  No Lend ID to Update
                                </Typography>
                              </Box>
                            </Option>
                          ) : (
                            lenderList.map(
                              (data, index) =>
                                // if isOpenToBorrow is true then show option otherwise not
                                data.isOpenToBorrow === true && (
                                  <Option
                                    key={data.requestID}
                                    value={data.requestID}
                                    label={data.requestID}
                                    onClick={() => setLendID(data.requestID)}
                                    style={{
                                      cursor: "pointer",
                                      padding: "0 10px",
                                    }}
                                  >
                                    <Box
                                      component="span"
                                      sx={{ display: "block" }}
                                    >
                                      <Typography component="span">
                                        {data.requestID}
                                      </Typography>
                                    </Box>
                                  </Option>
                                ),
                            )
                          )
                        ) : (
                          <Option
                            style={{ cursor: "pointer", padding: "0 10px" }}
                          >
                            <Box component="span" sx={{ display: "block" }}>
                              <Typography component="span" fontSize={14}>
                                No Lend ID Available
                              </Typography>
                            </Box>
                          </Option>
                        )}
                      </Select>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mt-3">
                    <button className="btn batan" onClick={updateLendIDStatus}>
                      Update ID Status
                    </button>
                  </div>
                  <hr />
                  <div className="row my-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <label>Lend ID</label>
                      <Select
                        value={lend_ID}
                        placeholder="Select Lend ID"
                        sx={{
                          minWidth: 198,
                          color: "white",
                          borderStyle: "none",
                          backgroundColor: "rgb(30,37,89)",
                          "&:hover": {
                            backgroundColor: "rgba(30,37,89,0.9)",
                            color: "white",
                          },
                        }}
                      >
                        {lenderList.length ? (
                          // if all the items have isOpenToBorrow false then show this option
                          lenderList.every(
                            (item) => item.isOpenToBorrow === true,
                          ) ? (
                            <Option
                              key={1000}
                              style={{ cursor: "pointer", padding: "0 5px" }}
                            >
                              <Box component="span" sx={{ display: "block" }}>
                                <Typography component="span" fontSize={14}>
                                  No Lend ID to Withdraw
                                </Typography>
                              </Box>
                            </Option>
                          ) : (
                            lenderList.map(
                              (data, index) =>
                                data.isOpenToBorrow === false && (
                                  <Option
                                    key={data.requestID}
                                    value={data.requestID}
                                    label={data.requestID}
                                    onClick={() => setLend_ID(data.requestID)}
                                    style={{
                                      cursor: "pointer",
                                      padding: "0 10px",
                                    }}
                                  >
                                    <Box
                                      component="span"
                                      sx={{ display: "block" }}
                                    >
                                      <Typography component="span">
                                        {data.requestID}
                                      </Typography>
                                    </Box>
                                  </Option>
                                ),
                            )
                          )
                        ) : (
                          <Option
                            style={{ cursor: "pointer", padding: "0 10px" }}
                          >
                            <Box component="span" sx={{ display: "block" }}>
                              <Typography component="span" fontSize={14}>
                                No Lend ID Available
                              </Typography>
                            </Box>
                          </Option>
                        )}
                      </Select>
                    </div>
                  </div>
                  {/* ssa */}
                  <div className="d-flex justify-content-start mt-3">
                    <button className="btn batan" onClick={withdrawLendAmount}>
                      Withdraw Lend Amount
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 mt-2 ">
              <div className="card colorsa">
                <div className="card-body">
                  <h6>Default Loan</h6>
                  <hr />
                  <div className="row my-1">
                    <div className="d-flex align-items-center justify-content-between mt-2 py-2">
                      <label>Loan ID</label>

                      <Select
                        value={selectedLoanID}
                        placeholder="Select Loan ID"
                        sx={{
                          minWidth: 198,
                          color: "white",
                          borderStyle: "none",
                          backgroundColor: "rgb(30,37,89)",
                          "&:hover": {
                            backgroundColor: "rgba(30,37,89,0.9)",
                            color: "white",
                          },
                        }}
                      >
                        {borrowerIdsList.length ? (
                          borrowerIdsList.map((data, index) => (
                            <Option
                              key={data}
                              value={data}
                              label={data}
                              onClick={() => setSelectedLoanID(data)}
                            >
                              <Box component="span" sx={{ display: "block" }}>
                                <Typography component="span">{data}</Typography>
                              </Box>
                            </Option>
                          ))
                        ) : (
                          <Option
                            style={{ cursor: "pointer", padding: "0 10px" }}
                          >
                            <Box component="span" sx={{ display: "block" }}>
                              <Typography component="span" fontSize={14}>
                                No Loan ID Available
                              </Typography>
                            </Box>
                          </Option>
                        )}
                      </Select>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex">
                    <button className="btn batan mt-2" onClick={defaultLoan}>
                      Default Loan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <LendTable
              lenderList={lenderList}
              title="Lender Details"
              itemsPerPage={10}
              tokenData={tokenData}
              url={url}
              web3={web3}
            />

            <LoanTable
              loanList={loanList}
              borrowerList2={borrowerList2}
              title="Loan Details"
              itemsPerPage={10}
              tokenData={tokenData}
              url={url}
              web3={web3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lend;
