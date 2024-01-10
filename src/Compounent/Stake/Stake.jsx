import React, { useState, useEffect } from "react";
import "./Stake.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  TokenAddress,
  TokenAbi,
  StakingAddress,
  StakingAbi,
  redeemRewardAddress,
  redeemRewardAbi,
} from "../../utils/Contracts";

function Stake() {
  let acc = useSelector((state) => state.connect?.connection);
  let web3 = useSelector((state) => state.connect?.web3);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [withdrawableAmount, setWithdrawableAmount] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const getStakedAmount = async () => {
    try {
      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const stakingContract = new web3.eth.Contract(StakingAbi, StakingAddress);
      const userDetail = await stakingContract.methods
        .checkUserDetail(acc)
        .call();

      let staked = web3.utils.fromWei(userDetail[0], "ether");

      setStakedAmount(staked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (acc === "Connect Wallet") {
      setBalance(0);
    } else {
      getBalance();
      getStakedAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acc]);

  const Stake = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please Connect Wallet");
        return;
      }

      if (amount < 10) {
        toast.error("Minimum 10 AFT required");
        return;
      }

      if (balance <= 0) {
        toast.error("Insufficient Balance");
        return;
      }

      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const tokenContract = new web3.eth.Contract(TokenAbi, TokenAddress);
      const stakingContract = new web3.eth.Contract(StakingAbi, StakingAddress);
      const weiAmount = web3.utils.toWei(amount.toString(), "ether");

      // Check if the user has already staked
      const userDetail = await stakingContract.methods
        .checkUserDetail(acc)
        .call();

      let staked = web3.utils.fromWei(userDetail[0], "ether");
      setStakedAmount(staked);

      if (userDetail[1] != false) {
        toast.error("You have already staked");
        return;
      }

      // Check if the user has sufficient balance for staking
      if (parseFloat(amount) > parseFloat(balance)) {
        toast.error("Insufficient Balance");
        return;
      }

      // Request approval
      const approveTx = await tokenContract.methods
        .approve(StakingAddress, weiAmount)
        .send({ from: acc });

      if (!approveTx.status) {
        toast.error("Approval failed");
        return;
      }

      toast.success("Approved Successfully");
      const stakeTx = await stakingContract.methods
        .stake(weiAmount)
        .send({ from: acc });

      if (stakeTx.status) {
        toast.success("Stake Successfully");
        setAmount(0);
        getBalance();
        getStakedAmount();
      } else {
        toast.error("Stake failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const Unstake = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please Connect Wallet");
        return;
      }

      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const stakingContract = new web3.eth.Contract(StakingAbi, StakingAddress);
      // Check if the user has already staked
      const userDetail = await stakingContract.methods
        .checkUserDetail(acc)
        .call();

      // Check lennder status and borrowStatus

      const lenderStatus = await stakingContract.methods
        .lenderStatus(acc)
        .call();
      const borrowStatus = await stakingContract.methods
        .borrowerStatus(acc)
        .call();

      if (lenderStatus === true) {
        toast.error("You are a lender, you can't unstake");
        return;
      }

      if (borrowStatus === true) {
        toast.error("You are a borrower, you can't unstake");
        return;
      }

      if (userDetail[1] === false) {
        toast.error("You have not staked yet");
        return;
      }
      const unstakeTx = await stakingContract.methods
        .unStake()
        .send({ from: acc });

      if (unstakeTx.status) {
        toast.success("Unstake Successfully");
        getBalance();
        setStakedAmount(0);
      } else {
        toast.error("Unstake failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // get balance
  const getBalance = async () => {
    try {
    const tokenContractOf = new web3.eth.Contract(TokenAbi, TokenAddress);
    const balance = await tokenContractOf.methods.balanceOf(acc).call();

    console.log("balance:", balance);

    // to convert wei to ether
    const balanceInEther = web3.utils.fromWei(balance, "ether");

    setBalance(balanceInEther);
    } catch (error) {
      console.error(error);
    }
    
  };

  async function getSignatureTest(contract, user, withdrawableAmount) {
    const blockNumber = await web3.eth.getBlockNumber();

    const block = await web3.eth.getBlock(blockNumber);
    const nonce = block.timestamp;
    console.log("nonce-timestamp:", nonce);

    let dataToSign = web3.utils.soliditySha3(
      contract.toLowerCase(),
      user.toLowerCase(),
      nonce,
      withdrawableAmount,
    );
    console.log("hash:", dataToSign);

    // let privateKey = process.env.REACT_APP_SIGNATURE_PRIVATE_KEY;
    let privateKey = "79db94410a39a288b7ecd2982a09bc1ec0b960ae1a7fba95c3a8dc7f7b02b01b"
    console.log("privateKey:", privateKey);
    let signature = await web3.eth.accounts.sign(dataToSign, privateKey);
    console.log("signature:", signature);

    return {
      nonce,
      signature: signature.signature,
    };
  }

  // Usage example:
  // getSignatureTest("0xContractAddress", "0xUserAddress", 1000);

  const claimReward = async () => {
    try {
      if (acc === "Connect Wallet") {
        toast.error("Please Connect Wallet");
        return;
      }

      if (!web3) {
        console.error("Web3 instance not available");
        return;
      }

      const contract = new web3.eth.Contract(
        redeemRewardAbi,
        redeemRewardAddress,
      );

      const withdrawableAmount = await contract.methods
        .getWithdrawableAmount(acc)
        .call();

      setWithdrawableAmount(web3.utils.fromWei(withdrawableAmount, "ether"));

      const { nonce, signature } = await getSignatureTest(
        redeemRewardAddress,
        acc,
        withdrawableAmount,
      );

      // const claimRewardTx = await contract.methods
      //   .claimTokens(withdrawableAmount, nonce, signature)
      //   .send({ from: acc });

      // if (claimRewardTx.status) {
      //   toast.success("Reward Withdraw Successfully");
      //   getBalance();
      //   setWithdrawableAmount(0);
      // } else {
      //   toast.error("Reward Withdraw failed");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-md-5 my-2 px-2">
      <h2>Stake</h2>
      <p>Stake AFT </p>
      {/* First table section  */}
      <div className="row pb-4">
        <div className="col-md-7 mx-auto col-sm-12 mt-2 ">
          <div className="card colorsa">
            <div className="card-body">
              <h6>AFT</h6>
              <hr />
              <div className="row px-2">
                <div className="col AUM">Wallet</div>
                <div className="col text-end AUM">
                  {balance % 1 !== 0 ? parseFloat(balance).toFixed(4) : balance}{" "}
                  <span className="fw-bold">AFT</span>
                </div>
              </div>
              <div className="row px-2">
                <div className="col AUM">Staked</div>
                <div className="col text-end AUM">
                  {stakedAmount} <span className="fw-bold">AFT</span>
                </div>
              </div>
              <div className="row px-2">
                <div className="col AUM">Claimable Amount</div>
                <div className="col text-end AUM">
                  {withdrawableAmount} <span className="fw-bold">AFT</span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ gap: "12px " }}
                >
                  <label>Token Amount</label>
                  <input
                    type="text"
                    className="px-2"
                    placeholder="Token Amounts"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>
              </div>
              <hr />
              <div className="d-flex " style={{ gap: "15px " }}>
                <button className="btn batan" onClick={Stake}>
                  Stake AFT
                </button>
                <button className="btn batan" onClick={Unstake}>
                  Unstake AFT
                </button>
                <button className="btn batan" onClick={claimReward}>
                  Withdraw Reward
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stake;
