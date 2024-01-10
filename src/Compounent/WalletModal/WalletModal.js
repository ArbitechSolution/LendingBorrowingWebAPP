import React from "react";

import {
  createWeb3Modal,
  defaultConfig,
} from "@web3modal/ethers/react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "18a2c9f15cd408ebabb6295107d38250";

// testnet bsc
const testnet = {
  name: "Binance Smart Chain Testnet",
  chainId: 97,
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  blockExplorerUrls: ["https://testnet.bscscan.com/"],
};

// 3. Create modal
const metadata = {
  name: "AFT",
  description: "Lend Borrow and Stake",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [testnet],
  projectId,
});

const WalletModal = () => {

  return <div></div>;
};

export default WalletModal;
