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
  // bscBuildBear: {
  //   chainId: "11840",
  //   chainName: "BuildBear Basic Quarsh Panaka",
  //   nativeCurrency: {
  //     name: "BB",
  //     symbol: "BB ETH",
  //     decimals: 18, // Corrected the decimals to 18 (the standard for BSC)
  //   },
  //   rpcUrls: ["https://rpc.buildbear.io/basic-quarsh-panaka-9a3497fb"],
  //   blockExplorerUrls: [
  //     "https://explorer.buildbear.io/basic-quarsh-panaka-9a3497fb",
  //   ],
  // },
};

let isItConnected = false;
let accounts;

const changeNetwork = async (networkName) => {
  try {
    if (!networks[networkName]) {
      console.log("Network not defined in code");
      return "Wrong network";
    }
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networks[networkName]],
    });
  } catch (err) {
    console.log("Error while changing network: ", err);
  }
};

const getAccounts = async () => {
  const web3 = new Web3(window.ethereum);
  try {
    return await web3.eth.getAccounts();
  } catch (error) {
    console.log("Error while fetching accounts: ", error);
    return null;
  }
};
// Function to handle the network switch
const handleNetworkSwitch = async (networkName) => {
  await changeNetwork({ networkName });
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
    if (!window.ethereum) {
      console.log("No crypto wallet found");
      return "No Wallet";
    }

    window.web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const netId = await window.web3.eth.net.getId();

    if (netId.toString() === networks.bsc.chainId) {
      isItConnected = true;
    } else if (netId.toString() === networks.bscBuildBear.chainId) {
      isItConnected = true;
    } else {
      isItConnected = false;
    }

    if (isItConnected) {
      return (await getAccounts())[0];
    } else {
      await handleNetworkSwitch("bsc"); // Change this line as per your desired default network
      return "Wrong network";
    }
  } catch (error) {
    console.log("Error while loading Web3: ", error);
    return "No Wallet";
  }
};
