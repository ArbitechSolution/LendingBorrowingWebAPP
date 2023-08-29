import Web3 from "web3";

// Constants to define the supported networks
const networks = {
  bsc: {
    chainId: "97",
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "tBNB",
      decimals: 18, // Corrected the decimals to 18 (the standard for BSC)
    },
    rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
};

let isItConnected = false;
let accounts;

// Function to switch the network in MetaMask
const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log("Error while changing network: ", err);
  }
};

// Function to handle the network switch
const handleNetworkSwitch = async (networkName) => {
  await changeNetwork({ networkName });
};

// Function to get accounts from MetaMask
const getAccounts = async () => {
  const web3 = window.web3;
  try {
    accounts = await web3.eth.getAccounts();
    return accounts;
  } catch (error) {
    console.log("Error while fetching accounts: ", error);
    return null;
  }
};

// Function to disconnect the wallet
export const disconnectWallet = async () => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
    console.log("Wallet disconnected");
  } catch (err) {
    console.log("Error while disconnecting wallet: ", err);
  }
};

// Function to load Web3 and connect with MetaMask
export const loadWeb3 = async () => {
  try {
    // Check if MetaMask is available
    if (window.ethereum) {
      // Create Web3 instance
      window.web3 = new Web3(window.ethereum);

      // Request account access (this is now the recommended way to request accounts)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the network ID
      const netId = await window.web3.eth.net.getId();

      // Check if connected to the desired network (BSC Testnet in this case)
      switch (netId.toString()) {
        case "97":
          isItConnected = true;
          break;
        default:
          // If not connected to the desired network, switch the network
          handleNetworkSwitch("bsc");
          isItConnected = false;
      }

      if (isItConnected) {
        // If connected to the desired network, get accounts and return the first account
        let accounts = await getAccounts();
        return accounts[0];
      } else {
        let res = "Wrong network"; // Corrected the typo here
        return res;
      }
    } else {
      let res = "No Wallet";
      return res;
    }
  } catch (error) {
    console.log("Error while loading Web3: ", error);
    let res = "No Wallet";
    return res;
  }
};
