import React, { useState, useEffect, Fragment } from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import Panel from "../ExpandablePanel/Panel";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";
import {
  Avatar,
  Box,
  ListItemDecorator,
  Typography,
  Select,
  Option,
} from "@mui/joy";
import {
  LendingAbi,
  LendingAddress,
  StakingAbi,
  StakingAddress,
  TokenAbi,
  TokenAddress,
  BUSDTokenAbi,
  BUSDTokenAddress,
} from "../../utils/Contracts";
import { red } from "@mui/material/colors";
import Pagination from "../Pagination/Pagination";

const array = [
  {
    LoanID: "12",
    ReqID: "12",
    LenderAddress: "12",
    CollateralToken: "12",
    CollateralAmount: "12",
    CollateralPrice: "12",
    BorrowToken: "12",
    BorrowAmount: "12",
    StartTime: "12",
    RepaymentTime: "12",
    InterestRate: "12",
    RepaidAmount: "12",
    RemainingAmount: "12",
    TotalInterest: "12",
    DefaultStatus: "12",
    CloseStatus: "12",
  },
];

function Borrow() {
  let acc = useSelector((state) => state.connect?.connection);
  let web3 = useSelector((state) => state.connect?.web3);
  let url = "https://testnet.bscscan.com/address/";
  const Web3 = require("web3");
  const BN = Web3.utils.BN;
  const [amount, setAmount] = useState(0);
  const [loanID, setLoanID] = useState(0);
  const [durationTime, setDurationTime] = useState(0);
  const [showItemIndex, setShowItemIndex] = useState(-1);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState();
  const [selectedValue, setSelectedValue] = useState("BNB");
  const [borrowerList, setBorrowerList] = useState([]);
  const [time, setTime] = useState();
  const [loan_ID, setLoan_ID] = useState(0);
  const [reavailLoanID, setReavailLoanID] = useState(0);
  const [redepositLoan_ID, setRedepositLoan_ID] = useState(0);
  const [redepositLoan_Amount, setRedepositLoan_Amount] = useState(0);
  const [calLoanID, setCalLoanID] = useState(0);
  const [calBorrowerAddress, setCalBorrowerAddress] = useState("");
  const [loanAdjResult, setLoanAdjResult] = useState({});
  const [selectedRequestToken, setSelectedRequestToken] = useState({
    name: "",
    address: "",
  });
  const [lendsRequestList, setLendsRequestList] = useState([]);
  const [availableTokensList, setAvailableTokensList] = useState([]);

  const [selectedLendToken, setSelectedLendToken] = useState();
  const [returnValue, setReturnValue] = useState([]);

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

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

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

  useEffect(() => {
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(borrowerList.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, borrowerList]);

  const handleValueChange = (name) => {
    setSelectedValue(name);
    const token = tokenData.find((item) => item.name === name);

    const selectedTokenAddress = token.address;

    setSelectedTokenAddress(selectedTokenAddress);
  };

  const showItem = (index) => {
    if (showItemIndex === index) {
      setShowItemIndex(-1);
    } else {
      setShowItemIndex(index);
    }
  };

  const handleSelectedRequest = (name) => {
    if (name === "") return;

    setSelectedRequestToken((prev) => {
      return {
        ...prev,
        name: name,
      };
    });

    const token = tokenData.find((item) => item.name === name);

    setSelectedRequestToken((prev) => {
      return {
        ...prev,
        address: token.address,
      };
    });
  };

  const selectedAddress = (addressList) => {
    switch (selectedValue) {
      case "BNB":
        return addressList[0];
      case "BUSD":
        return addressList[1];
      case "USDT":
        return addressList[2];
      case "ETH":
        return addressList[3];
      case "USDC":
        return addressList[4];
      case "XRP":
        return addressList[5];
      case "ADA":
        return addressList[6];
      case "DOGE":
        return addressList[7];
      case "MATIC":
        return addressList[8];
      case "TRX":
        return addressList[9];
      default:
        return "";
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

      setSelectedTokenAddress(selectedAddress(addressList));

      let tokens = [];

      for (let i = 0; i < addressList.length; i++) {
        tokens.push({
          name: tokenData[i].name,
          img: tokenData[i].img,
          address: addressList[i],
        });
      }
      const lendsRequest = await lendingContract.methods
        .getAllActiveLendRequests()
        .call({ from: acc });

      setLendsRequestList(lendsRequest);

      const available = new Set();
      // loop through all the lend requests
      lendsRequest.forEach((item, i) => {
        available.add(
          tokens.find((token) => token.address === item.tokenAddress),
        );
      });

      setAvailableTokensList([...available]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDepositCollecteral = async () => {
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

      if (selectedValue === "BNB") {
        const balance = await web3.eth.getBalance(acc);
        // balance to ether
        const balanceInEther = web3.utils.fromWei(balance, "ether");

        if (balanceInEther < amount) {
          toast.error("Insufficient BNB balance");
          return;
        }

        const deposit = await lendingContract.methods
          .depositCollateral(web3.utils.toWei(amount), selectedTokenAddress)
          .send({
            from: acc,
            value: web3.utils.toWei(amount),
          });

        if (deposit.status) {
          toast.success("Deposit Successfully");
          getLoanIDs();
          setAmount(0);
        }
      } else {
        const BusdBalance = await BUSDContractOf.methods
          .balanceOf(acc)
          .call({ from: acc });

        // console.log(BusdBalance);

        if (parseFloat(BusdBalance) < parseFloat(amount)) {
          toast.error("Insufficient BUSD balance");
          return;
        }

        const incAmount = (parseInt(amount) + 1).toString();
        const isApproved = await BUSDContractOf.methods
          .approve(LendingAddress, web3.utils.toWei(incAmount))
          .send({ from: acc });

        if (!isApproved.status) {
          toast.error("BUSD Approval Failed");
          return;
        }

        toast.success("BUSD approved Successfully");

        const deposit = await lendingContract.methods
          .depositCollateral(web3.utils.toWei(amount), selectedTokenAddress)
          .send({
            from: acc,
          });

        if (deposit.status) {
          toast.success("Deposit Successfully");
          getLoanIDs();
          setAmount(0);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getLoanIDs = async () => {
    try {
      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      const loanIDs = await lendingContract.methods.getLoanIDs(acc).call();

      // map loanIDs to get loan details
      const borrowerInfoPromises = loanIDs.map(async (loanID) => {
        return await lendingContract.methods.getborrowerInfo(loanID).call();
      });

      const borrowerInfo = await Promise.all(borrowerInfoPromises);

      // console.log("borrower info", borrowerInfo);
      // console.log("borrowerInfo", borrowerInfo);
      setBorrowerList(borrowerInfo);
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

      // find this loan ID in borrower list
      const isBorrower = borrowerList.find((item) => item.loanID === loanID);

      const calculateFees = await lendingContract.methods
        .calculateFeeOnTrading(isBorrower.collateralAmount, durationTime)
        .call();

      console.log("FEes", calculateFees);

      if (parseFloat(calculateFees) > parseFloat(AftBalance)) {
        toast.error("Insufficient balance to pay fees");
        return false;
      }

      if (parseInt(isBorrower.collateralAmount) < 10000) {
        return "skip";
      }

      if (parseInt(durationTime) < 31) {
        return "skip";
      }

      const isApproved = await tokenContract.methods
        .approve(LendingAddress, calculateFees)
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

  const AvailLoan = async () => {
    checkBalanceToPayFee();
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
      // if lendID, reqID, durationTime are 0 then return
      if (loanID === 0 || selectedLendToken === undefined || durationTime < 1) {
        toast.error("Please enter all the fields");
        return;
      }

      // Now check if the user is in the borrower list
      const isBorrower = borrowerList.find((item) => item.loanID === loanID);

      if (!isBorrower) {
        toast.error("Invalid loan ID ");
        return;
      }

      const lenderRequests = await lendingContract.methods
        .getAllActiveLendRequests()
        .call();

      console.log("Avail --- Lender Requests", lenderRequests);

      if (durationTime <= time / 60) {
        const isBalanceCheckPassed = await checkBalanceToPayFee();
        if (!isBalanceCheckPassed) {
          return;
        }
        const availLoan = await lendingContract.methods
          .availLoan(loanID, selectedLendToken, durationTime)
          .send({ from: acc });
        if (availLoan.status) {
          toast.success("Loan Availed Successfully");

          setTimeout(() => {
            getLoanIDs();
          }, 1000);
        }
      } else {
        toast.error("Invalid duration time");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllBorrowerInfo = async () => {
    try {
      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      const info = await lendingContract.methods
        .getAllBorrowerInfo()
        .call({ from: acc });
    } catch (err) {
      console.log(err);
    }
  };

  const RepayLoan = async () => {
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
      const BUSDContractOf = new web3.eth.Contract(
        BUSDTokenAbi,
        BUSDTokenAddress,
      );

      // check for this loan ID in borrower list
      const isBorrower = borrowerList.find((item) => item.loanID === loanID);
      let remainingLoanAmount = isBorrower[12]?.remainingLoanAmount;
      console.log(isBorrower);
      // setRepayAmount(isBorrower)
      if (!isBorrower) {
        toast.error("Invalid loan ID");
        return;
      }

      if (
        isBorrower.lendToken === "0x0000000000000000000000000000000000000000"
      ) {
        toast.error("No loan available to repay");
        return;
      }

      if (isBorrower.payment.isClosed || isBorrower.payment.isDefaulted) {
        toast.error("Loan already closed");
        return;
      }

      // repayment time is in this format 922121239
      if (isBorrower.repaymentTime < Date.now() / 1000) {
        toast.error("Loan Time Expired");
        return;
      }

      // if (parseInt(repayAmount) < 1) {
      //   toast.error("Invalid amount");
      //   return;
      // }

      const token = tokenData.find(
        (item) => item.address === isBorrower.lendToken,
      ).name;
      if (token === "BNB" || token === "MATIC" || token === "ETH") {
        const repay = await lendingContract.methods
          .repayLoan(loan_ID, remainingLoanAmount)
          .send({ from: acc, value: remainingLoanAmount });

        if (repay.status) {
          toast.success("Repay Loan Successful");
          getLoanIDs();
        }
      } else {
        const approve = await BUSDContractOf.methods
          .approve(LendingAddress, web3.utils.toWei(remainingLoanAmount))
          .send({
            from: acc,
          });
        if (approve.status) {
          toast.success("Approved Successfully");
          const repayAmount = new BN(String(remainingLoanAmount));
          const repay = await lendingContract.methods
            .repayLoan(loanID, repayAmount)
            .send({ from: acc, value: 0 });

          if (repay.status) {
            toast.success("Repay Loan Successful");
            getLoanIDs();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const WithdrawCollateral = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please connect wallet");
        return;
      }

      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);
      console.log("withdrawLoan_ID", loanID);
      // check for this loan ID in borrower list
      const isBorrower = borrowerList.find((item) => item.loanID === loanID);

      if (!isBorrower) {
        toast.error("Invalid loan ID");
        return;
      }
      console.log("withdrawLoan_ID", isBorrower.payment["isDefaulted"]);
      if (isBorrower.payment["isDefaulted"]) {
        toast.error("Loan is defaulted");
        return;
      }

      if (isBorrower.payment.isClosed) {
        //
        const withdraw = await lendingContract.methods
          .withdrawCollateral(loanID)
          .send({ from: acc });

        if (withdraw.status) {
          toast.success("Withdraw Successful");
          getLoanIDs();
        }
      } else {
        toast.error("Loan is not closed");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ReAvail = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please connect wallet");
        return;
      }

      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      // check for this loan ID in borrower list
      const isBorrower = borrowerList.find(
        (item) => item.loanID === reavailLoanID,
      );
      if (returnValue.additionalLoanAvailable > 0) {
        if (!isBorrower) {
          toast.error("Invalid loan ID");
          return;
        }

        // check if loan is closed
        if (isBorrower.payment.isClosed) {
          toast.error("Loan is already closed");
          return;
        }

        // check if loan is defaulted
        if (isBorrower.payment.isDefaulted) {
          toast.error("Loan is defaulted");
          return;
        }

        // check if loan is reposted
        if (isBorrower.payment.isRedeposit) {
          // avail loan
          const availLoan = await lendingContract.methods
            .reavailLoan(reavailLoanID)
            .send({ from: acc });

          if (availLoan.status) {
            toast.success("Loan Availed Successfully");
            getLoanIDs();
          }
        } else {
          toast.error("Loan is not redeposited");
          return;
        }
      } else {
        toast.error("No additional loan available");
        return;
      }
      // check for this loan ID in borrower list
    } catch (error) {
      console.log(error);
    }
  };

  const Redeposit = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please connect wallet");
        return;
      }

      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);
      // check for this loan ID in borrower list
      const isBorrower = borrowerList.find(
        (item) => item.loanID === redepositLoan_ID,
      );

      if (!isBorrower) {
        toast.error("Invalid loan ID");
        return;
      }

      // check if loan is closed
      if (isBorrower.payment.isClosed) {
        toast.error("Loan is already closed");
        return;
      }

      // check if loan is defaulted
      if (isBorrower.payment.isDefaulted) {
        toast.error("Loan is defaulted");
        return;
      }

      // check if loan is redeposited
      if (isBorrower.payment.isRedeposit) {
        toast.error("Loan is already redeposited");
        return;
      }

      if (returnValue.additionalDepositRequired > 0) {
        // check if loan is repaid
        const calculate = await lendingContract.methods
          .calculateLoanAdjustment(redepositLoan_ID, isBorrower.borrowerAddress)
          .call({ from: acc });

        if (calculate[0] == 0 || calculate[1] == 0) {
          toast.error("No additional redeposit required");
          return;
        }

        if (calculate[0] === redepositLoan_Amount) {
          // redeposit

          // check token type
          const token = tokenData.find(
            (item) => item.address === isBorrower.collateralToken,
          ).name;

          if (token === "BNB" || token === "MATIC" || token === "ETH") {
            const redeposit = await lendingContract.methods
              .redepositCollateral(redepositLoan_Amount, redepositLoan_ID)
              .send({
                from: acc,
                value: web3.utils.toWei(redepositLoan_Amount),
              });
          } else {
            // approve first
            const BUSDContractOf = new web3.eth.Contract(
              BUSDTokenAbi,
              BUSDTokenAddress,
            );

            const approve = await BUSDContractOf.methods
              .approve(LendingAddress, web3.utils.toWei(redepositLoan_Amount))
              .send({ from: acc });

            if (approve.status) {
              const redeposit = await lendingContract.methods
                .redepositCollateral(redepositLoan_Amount, redepositLoan_ID)
                .send({ from: acc, value: web3.utils.toWei("0") });

              if (redeposit.status) {
                toast.success("Redeposit Successful");
                getLoanIDs();
              }
            }
          }
        }
      } else {
        toast.error("No additional redeposit required");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateLoanAdjustment = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please connect wallet");
        return;
      }

      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      // check for this loan ID in borrower list
      const isBorrower = borrowerList.find((item) => item.loanID === calLoanID);

      if (!isBorrower) {
        toast.error("Invalid loan ID");
        return;
      }

      if (isBorrower.borrowerAddress !== calBorrowerAddress) {
        toast.error("Invalid borrower address");
        return;
      }

      // check if loan is closed
      if (isBorrower.payment.isClosed) {
        toast.error("Loan is already closed");
        return;
      }

      if (isBorrower.lendAmount == 0) {
        toast.error("Loan is not available");
        return;
      }

      const calculate = await lendingContract.methods
        .calculateLoanAdjustment(calLoanID, calBorrowerAddress)
        .call({ from: acc });

      if (calculate[0] == 0 && calculate[1] == 0) {
        toast.error("No additional collateral or avail amount found");
      }

      if (calculate[0] > 0) {
        setLoanAdjResult({
          collateralAmount: calculate[0],
          borrowAmount: calculate[1],
        });
        toast.error("Pay additional collateral amount to save your loan");
        return;
      }

      if (calculate[1] > 0) {
        setLoanAdjResult({
          collateralAmount: calculate[0],
          borrowAmount: calculate[1],
        });
        toast.error("You can avail additional loan amount");
        return;
      }
      setReturnValue([calculate]);
      console.log(returnValue);
    } catch (error) {
      console.log(error);
    }
  };
  const [requestIdIndex, setRequestIdIndex] = useState(null);
  const getIDandIndex = (data, index) => {
    setTime(data[6]);
    setSelectedLendToken(data.requestID);
    // console.log(selectedLendToken);
    setRequestIdIndex(index);
  };
  useEffect(() => {
    if (acc === "Connect Wallet") return;
    getAllTokenAddress();
    getLoanIDs();
    getAllBorrowerInfo();
    handleSelectedRequest(selectedRequestToken.name);
  }, [acc]);

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    toast.success("Copied to clipboard");
  };
  const getcalLoanIdAndcalBorrowerAddress = (data) => {
    setCalLoanID(data.loanID);
    setCalBorrowerAddress(data.borrowerAddress);
  };
  // const getRedepositLoanAndRedepositAddress = (data) => {
  //   setRedepositLoan_ID(data.loanID);
  // };

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="px-md-5 mt-2 mb-4 px-2">
        <h2>Borrow</h2>
        <p>Borrow your Assets</p>

        <div className="row pb-4">
          <div className="col-md-6 mx-auto col-sm-12 mt-2 ">
            <div className="card color">
              <div className="card-body">
                <h6>Deposite Collecteral</h6>
                <hr />
                <div className="row my-2">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ gap: "12px " }}
                  >
                    <label> Amount</label>
                    <input
                      type="number"
                      className="py-2 px-2 wd"
                      placeholder="Amount"
                      value={amount || 0}
                      onChange={(e) =>
                        handleInputChange(e.target.value, setAmount)
                      }
                      name=""
                      id=""
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
                <div className="d-flex mb-5" style={{ gap: "15px " }}>
                  <button
                    className="btn  batan"
                    onClick={handleDepositCollecteral}
                  >
                    Deposite Collecteral
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mx-auto col-sm-12 mt-2 ">
            <div className="card color">
              <div className="card-body">
                <h6>Avail Loan</h6>
                <hr />
                <div className="row my-2">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ gap: "12px " }}
                  >
                    <label>Loan ID</label>

                    <Select
                      value={loanID}
                      placeholder="Select Loan ID"
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
                      {borrowerList.length === 0 ? (
                        <Option>
                          <Box component="span" sx={{ display: "block" }}>
                            <Typography component="span" fontSize={14}>
                              No Loan ID Available
                            </Typography>
                          </Box>
                        </Option>
                      ) : (
                        borrowerList.map(
                          (data, index) =>
                            data.status === "1" && (
                              <Option
                                key={data.loanID}
                                value={data.loanID}
                                label={data.loanID}
                                onClick={() => setLoanID(data.loanID)}
                              >
                                <Box component="span" sx={{ display: "block" }}>
                                  <Typography component="span">
                                    {data.loanID}
                                  </Typography>
                                </Box>
                              </Option>
                            ),
                        )
                      )}
                    </Select>
                  </div>
                </div>
                <div className="row my-2">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ gap: "12px " }}
                  >
                    <label>Available Assets</label>
                    <Select
                      value={selectedRequestToken.name}
                      placeholder="Select Asset"
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
                      {availableTokensList.length === 0 ? (
                        <Option>
                          <Box component="span" sx={{ display: "block" }}>
                            <Typography component="span" fontSize={14}>
                              No Asset Available
                            </Typography>
                          </Box>
                        </Option>
                      ) : (
                        availableTokensList.map((data, index) => (
                          <Option
                            key={data.name}
                            value={data.name}
                            label={data.name}
                            onClick={() => handleSelectedRequest(data.name)}
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
                        ))
                      )}
                    </Select>
                  </div>
                </div>

                <div className="row my-2">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ gap: "12px " }}
                  >
                    <label>Available Lend IDs</label>
                    <Select
                      value={selectedLendToken}
                      placeholder="Select Lend ID"
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
                      {lendsRequestList.length === 0 ? (
                        <Option>
                          <Box component="span" sx={{ display: "block" }}>
                            <Typography component="span" fontSize={14}>
                              No Lend ID Available
                            </Typography>
                          </Box>
                        </Option>
                      ) : selectedRequestToken.address === "" ? (
                        <Option>
                          <Box component="span" sx={{ display: "block" }}>
                            <Typography component="span" fontSize={14}>
                              Select Asset First
                            </Typography>
                          </Box>
                        </Option>
                      ) : (
                        lendsRequestList.map((data, index) =>
                          data.tokenAddress === selectedRequestToken.address &&
                          data.isOpenToBorrow === true ? (
                            <Option
                              key={data.requestID}
                              value={data.requestID}
                              label={data.requestID}
                              onClick={() => getIDandIndex(data, index)}
                            >
                              <Box component="span" sx={{ display: "flex" }}>
                                <Typography component="span">
                                  {data.requestID}
                                  {"  "} ({data.interestRate}% interest)
                                  {"  "} ({data.lendingDuration / 60} mintues)
                                </Typography>
                              </Box>
                            </Option>
                          ) : null,
                        )
                      )}
                    </Select>
                  </div>
                </div>

                <div className="row my-2">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ gap: "12px " }}
                  >
                    <label>Duration Time</label>
                    <input
                      type="number"
                      className="py-2 px-2 wd"
                      placeholder="Duration"
                      name=""
                      id=""
                      value={durationTime || 0}
                      onChange={(e) =>
                        handleInputChange(e.target.value, setDurationTime)
                      }
                    />
                  </div>
                </div>
                <hr />
                <button className="btn batan" onClick={AvailLoan}>
                  Avail Loan
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 mt-3 ">
            <div className="card color">
              <div className="card-body">
                <h6>ReDeposit</h6>
                <hr />
                <div className="row my-2">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ gap: "12px " }}
                  >
                    <label>Loan ID</label>
                    <Select
                      value={redepositLoan_ID}
                      placeholder="Select Loan ID"
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
                      {borrowerList.length === 0 ? (
                        <Option>
                          <Box component="span" sx={{ display: "block" }}>
                            <Typography component="span" fontSize={14}>
                              No Loan ID Available
                            </Typography>
                          </Box>
                        </Option>
                      ) : (
                        borrowerList.map((data, index) =>
                          data.repaymentTime > Math.floor(Date.now() / 1000) &&
                          data?.payment["isClosed"] === false ? (
                            <Option
                              key={data.loanID}
                              value={data.loanID}
                              label={data.loanID}
                              onClick={() => setRedepositLoan_ID(data.loanID)}
                            >
                              <Box component="span" sx={{ display: "block" }}>
                                <Typography component="span">
                                  {data.loanID}
                                </Typography>
                              </Box>
                            </Option>
                          ) : null,
                        )
                      )}
                    </Select>
                  </div>
                </div>
                <hr />
                <button className="btn batan" onClick={Redeposit}>
                  Redeposit
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 mt-3 ">
            <div className="card color">
              <div className="card-body">
                <h6>Repay Loan</h6>
                <hr />
                <div className="row my-2">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ gap: "12px " }}
                  >
                    <label>Loan ID</label>
                    <Select
                      value={loanID}
                      placeholder="Select Loan ID"
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
                      {borrowerList.length === 0 ? (
                        <Option>
                          <Box component="span" sx={{ display: "block" }}>
                            <Typography component="span" fontSize={14}>
                              No Loan ID Available
                            </Typography>
                          </Box>
                        </Option>
                      ) : (
                        borrowerList.map((data, index) =>
                          data.repaymentTime > Math.floor(Date.now() / 1000) &&
                          data?.payment["isClosed"] === false ? (
                            <Option
                              key={data.loanID}
                              value={data.loanID}
                              label={data.loanID}
                              onClick={() => setLoanID(data.loanID)}
                            >
                              <Box component="span" sx={{ display: "block" }}>
                                <Typography component="span">
                                  {data.loanID}
                                </Typography>
                              </Box>
                            </Option>
                          ) : null,
                        )
                      )}
                    </Select>
                  </div>
                </div>

                <hr />
                <button className="btn batan" onClick={RepayLoan}>
                  Repay Loan
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 mt-3 ">
            <div className="card color">
              <div className="card-body">
                <h6>ReAvail</h6>
                <hr />
                <div className="row my-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <label>Loan ID</label>
                    <Select
                      value={reavailLoanID}
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
                      style={{
                        minWidth: "50%",
                      }}
                    >
                      {borrowerList.length === 0 ? (
                        <Option>
                          <Box component="span" sx={{ display: "block" }}>
                            <Typography component="span" fontSize={14}>
                              No Loan ID Available
                            </Typography>
                          </Box>
                        </Option>
                      ) : (
                        borrowerList.map((data, index) =>
                          data.repaymentTime > Math.floor(Date.now() / 1000) &&
                          data?.payment["isClosed"] === false ? (
                            <Option
                              key={data.loanID}
                              value={data.loanID}
                              label={data.loanID}
                              onClick={() => setReavailLoanID(data.loanID)}
                            >
                              <Box component="span" sx={{ display: "block" }}>
                                <Typography component="span">
                                  {data.loanID}
                                </Typography>
                              </Box>
                            </Option>
                          ) : null,
                        )
                      )}
                    </Select>
                  </div>
                </div>

                <hr />
                <button className="btn batan" onClick={ReAvail}>
                  Reavail
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 mt-3 ">
            <div className="card color">
              <div className="card-body">
                <h6>Withdraw Collateral</h6>
                <hr />
                <div className="row my-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <label>Loan ID</label>
                    <Select
                      value={loanID}
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
                      style={{
                        minWidth: "50%",
                      }}
                    >
                      {borrowerList.length === 0 ? (
                        <Option>
                          <Box component="span" sx={{ display: "block" }}>
                            <Typography component="span" fontSize={14}>
                              No Loan ID Available
                            </Typography>
                          </Box>
                        </Option>
                      ) : (
                        borrowerList.map((data, index) =>
                          data?.payment["isClosed"] === true ? (
                            <Option
                              key={data.loanID}
                              value={data.loanID}
                              label={data.loanID}
                              onClick={() => setLoanID(data.loanID)}
                            >
                              <Box component="span" sx={{ display: "block" }}>
                                <Typography component="span">
                                  {data.loanID}
                                </Typography>
                              </Box>
                            </Option>
                          ) : null,
                        )
                      )}
                    </Select>
                  </div>
                </div>

                <hr />
                <button className="btn batan" onClick={WithdrawCollateral}>
                  Withdraw Collateral
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 mt-3 ">
            <div className="card color">
              <div className="card-body">
                <h6>Calculate Loan Adjustment</h6>
                <hr />
                <div className="row my-2">
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ gap: "12px " }}
                  >
                    <label>Loan ID</label>

                    <Select
                      value={calLoanID}
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
                      style={{
                        minWidth: "50%",
                      }}
                    >
                      {borrowerList.length === 0 ? (
                        <Option>
                          <Box component="span" sx={{ display: "block" }}>
                            <Typography component="span" fontSize={14}>
                              No Loan ID Available
                            </Typography>
                          </Box>
                        </Option>
                      ) : (
                        borrowerList.map((data, index) => (
                          <Option
                            key={data.loanID}
                            value={data.loanID}
                            label={data.loanID}
                            onClick={() =>
                              getcalLoanIdAndcalBorrowerAddress(data)
                            }
                          >
                            <Box component="span" sx={{ display: "block" }}>
                              <Typography component="span">
                                {data.loanID}
                              </Typography>
                            </Box>
                          </Option>
                        ))
                      )}
                    </Select>
                  </div>
                </div>

                <div className="row my-2">
                  {loanAdjResult.collateralAmount && (
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ gap: "12px " }}
                    >
                      <label>{"Additional Collateral:"}</label>
                      <div>
                        {web3.utils.fromWei(loanAdjResult.collateralAmount)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="row my-2">
                  {loanAdjResult.borrowAmount && (
                    <div
                      className="d-flex align-items-center justify-content-between"
                      style={{ gap: "12px " }}
                    >
                      <label>Additional Avail</label>
                      <div>
                        {" "}
                        {web3.utils.fromWei(loanAdjResult.borrowAmount)}{" "}
                      </div>
                    </div>
                  )}
                </div>

                <hr />
                <button className="btn batan" onClick={calculateLoanAdjustment}>
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="my-3 text-center">Borrower Details</h2>
        <div className="card color">
          <div className="card-body  table-responsive">
            <table className="table text-white text-center ">
              <thead>
                <tr>
                  <th scope="col" className="wi_th"></th>
                  <th scope="col" className="wi_th">
                    Loan ID
                  </th>
                  <th scope="col" className="wi_th">
                    Lend ID{" "}
                  </th>
                  <th scope="col" className="wi_th">
                    Lender Address
                  </th>
                  <th scope="col" className="wi_th">
                    Collateral Token
                  </th>
                  <th scope="col" className="wi_th">
                    Collateral Amount
                  </th>
                  <th scope="col" className="wi_th">
                    Collateral Price
                  </th>
                  <th scope="col" className="wi_th">
                    Borrow Token
                  </th>
                  <th scope="col" className="wi_th">
                    Borrow Amount{" "}
                  </th>
                  <th scope="col" className="wi_th">
                    Start Time{" "}
                  </th>
                  <th scope="col" className="wi_th">
                    Repayment Time
                  </th>
                  <th scope="col" className="wi_th">
                    Interest Rate
                  </th>
                  <th scope="col" className="wi_th">
                    Repaid Amount
                  </th>
                  <th scope="col" className="wi_th">
                    Remaining Amount
                  </th>
                  <th scope="col" className="wi_th">
                    Total Interest
                  </th>
                  <th scope="col" className="wi_th">
                    Default Loan{" "}
                  </th>
                  <th scope="col" className="wi_th">
                    Close Loan{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item, i) => (
                  <Fragment key={i}>
                    {/* {console.log(item)} */}
                    <tr className="border-bottom  sdsd">
                      <td>
                        <button
                          className="btn btn-sm btn-outline-light"
                          style={{ padding: "2px 6px" }}
                          onClick={() => showItem(i)}
                        >
                          {showItemIndex === i ? (
                            <FaChevronDown size={12} />
                          ) : (
                            <FaChevronLeft size={12} />
                          )}
                        </button>
                      </td>
                      <td>{item.loanID}</td>
                      <td>{item.lendRequestID}</td>
                      <td>
                        <span className="d-flex flex-cols">
                          {item.lenderAddress.slice(0, 4) +
                            "..." +
                            item.lenderAddress.slice(-3)}
                          <FaCopy
                            className="ms-2 cursor-pointer"
                            size={15}
                            color="rgb(89, 99, 145)"
                            style={{ marginTop: "5px", cursor: "pointer" }}
                            onClick={() => copyToClipboard(item.lenderAddress)}
                          />
                        </span>
                      </td>
                      <td>
                        <a href={url + item.collateralToken} target="_blank">
                          {
                            tokenData.find(
                              (token) => token.address === item.collateralToken,
                            ).name
                          }
                        </a>
                      </td>
                      <td>{web3.utils.fromWei(item.collateralAmount)}</td>
                      <td>
                        {"$" + (item.collateralLivePrice / 10 ** 8).toFixed(2)}
                      </td>
                      <td>
                        <a href={url + item.lendToken} target="_blank">
                          {
                            tokenData.find(
                              (token) => token.address === item.lendToken,
                            )?.name
                          }
                        </a>
                      </td>
                      <td>{web3.utils.fromWei(item.lendAmount)}</td>
                      <td>
                        {item.loanStartTime !== "0"
                          ? new Date(item.loanStartTime * 1000).toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        {item.repaymentTime !== "0"
                          ? new Date(item.repaymentTime * 1000).toLocaleString()
                          : "-"}
                      </td>
                      <td>{item.payment["interestRate"] + "%"}</td>
                      <td>
                        {web3.utils.fromWei(item.payment["repaidAmount"])}
                      </td>
                      <td>
                        {web3.utils.fromWei(
                          item.payment["remainingLoanAmount"],
                        )}
                      </td>
                      <td>
                        {web3.utils.fromWei(item.payment["loanPlusInterest"])}
                      </td>
                      <td>{item.payment["isDefaulted"] ? "Yes" : "No"}</td>
                      <td>{item.payment["isClosed"] ? "Yes" : "No"}</td>
                    </tr>
                    {showItemIndex === i && (
                      <tr>
                        <Panel item={item} />
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3">
          <Pagination
            pageCount={Math.ceil(borrowerList.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Borrow;
