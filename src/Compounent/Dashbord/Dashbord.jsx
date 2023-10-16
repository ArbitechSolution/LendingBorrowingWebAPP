import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Dash_Stats from "../Dash_Stats/Dash_Stats";
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
import Composition_Table from "../Composition_Table/Composition_Table";
import Composition_Table2 from "../Composition_Table/Composition_Table2";

function Dashbord() {
  let acc = useSelector((state) => state.connect?.connection);
  let web3 = useSelector((state) => state.connect?.web3);
  const [lenderData, setLenderData] = useState([]);
  const [borrowerData, setBorrowerData] = useState([]);
  

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
    } catch (err) {
      console.log(err);
    }
  };

  const getLenderData = async () => {
    try {
      if (acc === "Connect Wallet") return;

      let lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      const lendsRequest = await lendingContract.methods
        .getAllActiveLendRequests()
        .call({ from: acc });

      setLenderData(lendsRequest);
    } catch (error) {
      console.log(error);
    }
  };

  const getBorrowerData = async () => {
    try {
      if (acc === "Connect Wallet") return;

      let lendingContract = new web3.eth.Contract(LendingAbi, LendingAddress);

      const borrowerReq = await lendingContract.methods
        .getAllBorrowerInfo()
        .call({ from: acc });

      setBorrowerData(borrowerReq);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (acc === "Connect Wallet") return;
    getLenderData();
    getBorrowerData();
    getAllTokenAddress();
  }, [acc]);

  return (
    <div style={{marginTop:"150px"}}>
      {/* <div style={{width:"44%" , height:"550px" ,
    boxShadow:"50px -50px 900px skyblue",
    opacity:"0.5",
    position:"absolute",
    top:"170px",
    right:"60px"
    }}>

      </div> */}
      <Dash_Stats />
      {/* <Token /> */}
      <Composition_Table
        title="Lender"
        table_data={lenderData}
        tokenData={tokenData}
        itemsPerPage={10} // default 10
      />
      <Composition_Table2
        title="Borrower"
        table_data={borrowerData}
        tokenData={tokenData}
        itemsPerPage={10} // default 10
      />
    </div>
  );
}

export default Dashbord;
