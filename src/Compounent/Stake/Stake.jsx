import React, { useState, useEffect } from "react";
import "./Stake.css";
import { useSelector, useDispatch } from "react-redux";
import {
  TokenAddress,
  TokenAbi,
  StakingAddress,
  StakingAbi,
  LendingAddress,
  LendingAbi,
} from "../../utils/Contracts";
function Stake() {
  let acc = useSelector((state) => state.connect?.connection);
  let web3 = useSelector((state) => state.connect?.web3);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    if (acc === "Connect Wallet") {
      setBalance(0);
    } else {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acc]);

  const Stake = async () => {
    if (acc === "Connect Wallet") {
      return;
    }

    if (!web3) {
      console.error("Web3 instance not available");
      return;
    }

    const tokenContractOf = new web3.eth.Contract(TokenAbi, TokenAddress);
    const stakingContractOf = new web3.eth.Contract(StakingAbi, StakingAddress);

    const weiAmount = web3.utils.toWei(amount, "ether");
    try {
      // Step 1: Approve
      if (weiAmount > 0 && balance > 0) {
        if (parseFloat(amount) > parseFloat(balance)) {
          // Use parseFloat for comparisons
          alert("Insufficient Balance");
          return;
        }
        const gasEstimate = await tokenContractOf.methods
          .approve(StakingAddress, weiAmount)
          .estimateGas({ from: acc });
        console.log("Gas estimate for approve transaction:", gasEstimate);

        // Request approval
        await tokenContractOf.methods
          .approve(StakingAddress, weiAmount)
          .send({ from: acc });

        // // Step 2: Stake
        // const stake = await stakingContractOf.methods
        //   .stake(weiAmount)
        //   .send({ from: acc });

        // console.log("stake", stake);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // get balance
  const getBalance = async () => {
    const web3 = window.web3;
    const tokenContractOf = new web3.eth.Contract(TokenAbi, TokenAddress);
    const balance = await tokenContractOf.methods.balanceOf(acc).call();

    // to convert wei to ether
    const balanceInEther = web3.utils.fromWei(balance, "ether");

    setBalance(balanceInEther);
  };

  return (
    <div className="px-md-5 my-5 px-2">
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
                <div className="col text-end AUM">{balance}</div>
              </div>
              <div className="row px-2">
                <div className="col AUM">Staked</div>
                <div className="col text-end AUM">$851,663,404</div>
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
                    className=""
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
                <button className="btn batan">Unstake AFT</button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-md-6 col-sm-12 mt-2">
          <div className="card colorsa">
            <div className="card-body">
              <h6>Total Rewards</h6>
              <hr />
              <div className="row">
                <div className="col AUM">ETH (WETH)</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">AFT</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Staked Amount</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
            
              <div className="row">
                <div className="col AUM">Total</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
             
          <footer className="" > <hr className=""/>
                <button className="btn batan">Unstake AFT</button>
            </footer>
            </div>
            
            
          </div>
        </div> */}
      </div>
      {/* second table section  */}
      {/* <div className="row">
        <div className="col-md-6 col-sm-12 mt-2 ">
    
          <div className="card color">
            <div className="card-body">
              <h6>GLP (Arbitrum)</h6>
              <hr />
              <div className="row">
                <div className="col AUM">Price</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Wallet</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Staked</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <hr/>
              <div className="row">
                <div className="col AUM">APR</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Rewards</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div><hr/>
            
            
              <div className="row">
                <div className="col AUM">Total Staked</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Total Supply</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
            
              <hr/>
              <footer className="d-flex "style={{gap:"10px "}}>
              <button className="btn batan">Buy GLP</button>
              <button className="btn batan">Sell GLP</button>
              <button className="btn batan">Purchase Insurance</button>
              </footer>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 mt-2">
          <div className="card color">
            <div className="card-body">
              <h6>Escrowed AFT</h6>
              <hr />
              <div className="row">
                <div className="col AUM">Price</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Wallet</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Staked</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <hr/>
              <div className="row">
                <div className="col AUM">APR</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Rewards</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div><hr/>
            
            
              <div className="row">
                <div className="col AUM">Total Staked</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Total Supply</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <footer className=" " > <hr/>
                <button className="btn batan">Connect Wallet</button>
            </footer>
              </div>
            
            
          </div>
        </div>
      </div> */}
      {/* third table section 
      <div className="mt-5">
      <h2>Vest</h2>
      <p>Convert esAFT tokens to AFT tokens.<br/>
Please read the vesting details before using the vaults.</p>
      <div className="row">
        <div className="col-md-6 col-sm-12 mt-2 ">
    
          <div className="card color">
            <div className="card-body">
              <h6>AFT</h6>
              <hr />
              <div className="row">
                <div className="col AUM">Price</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Wallet</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Staked</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <hr/>
              
              <button className="btn batan">Connect Wallet</button>

            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 mt-2">
          <div className="card color">
            <div className="card-body">
              <h6>Total Rewards</h6>
              <hr />
              <div className="row">
                <div className="col AUM">ETH (WETH)</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">AFT</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
              <div className="row">
                <div className="col AUM">Escrowed AFT</div>
                <div className="col text-end AUM">$851,663,404</div>
              </div>
            
              <footer className="" > <hr />
                <button className="btn batan">Connect Wallet</button>
            </footer>
          
            </div>
            
           
          </div>
        </div>
      </div>
      </div> */}
    </div>
  );
}

export default Stake;
