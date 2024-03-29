// // import Web3 from "web3";

// // // Constants to define the supported networks
// // const networks = {
// //   // bsc: {
// //   //   chainId: "97",
// //   //   chainName: "Binance Smart Chain Testnet",
// //   //   nativeCurrency: {
// //   //     name: "BNB",
// //   //     symbol: "tBNB",
// //   //     decimals: 18, // Corrected the decimals to 18 (the standard for BSC)
// //   //   },
// //   //   rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org"],
// //   //   blockExplorerUrls: ["https://testnet.bscscan.com"],
// //   // },
// //   bscBuildBear: {
// //     chainId: "11840",
// //     chainName: "BuildBear Basic Quarsh Panaka",
// //     nativeCurrency: {
// //       name: "BB",
// //       symbol: "BB ETH",
// //       decimals: 18, // Corrected the decimals to 18 (the standard for BSC)
// //     },
// //     rpcUrls: ["https://rpc.buildbear.io/basic-quarsh-panaka-9a3497fb"],
// //     blockExplorerUrls: [
// //       "https://explorer.buildbear.io/basic-quarsh-panaka-9a3497fb",
// //     ],
// //   },
// // };

// // let isItConnected = false;
// // let accounts;

// // const changeNetwork = async (networkName) => {
// //   try {
// //     if (!networks[networkName]) {
// //       console.log("Network not defined in code");
// //       return "Wrong network";
// //     }
// //     if (!window.ethereum) throw new Error("No crypto wallet found");
// //     await window.ethereum.request({
// //       method: "wallet_addEthereumChain",
// //       params: [networks[networkName]],
// //     });
// //   } catch (err) {
// //     console.log("Error while changing network: ", err);
// //   }
// // };

// // const getAccounts = async () => {
// //   const web3 = new Web3(window.ethereum);
// //   try {
// //     return await web3.eth.getAccounts();
// //   } catch (error) {
// //     console.log("Error while fetching accounts: ", error);
// //     return null;
// //   }
// // };
// // // Function to handle the network switch
// // const handleNetworkSwitch = async (networkName) => {
// //   await changeNetwork({ networkName });
// // };

// // // Function to disconnect the wallet
// // export const disconnectWallet = async () => {
// //   try {
// //     if (!window.ethereum) throw new Error("No crypto wallet found");
// //     await window.ethereum.request({
// //       method: "wallet_requestPermissions",
// //       params: [{ eth_accounts: {} }],
// //     });
// //     console.log("Wallet disconnected");
// //   } catch (err) {
// //     console.log("Error while disconnecting wallet: ", err);
// //   }
// // };

// // // Function to load Web3 and connect with MetaMask
// // export const loadWeb3 = async () => {
// //   try {
// //     // if (!window.ethereum) {
// //     //   console.log("No crypto wallet found");
// //     //   return "No Wallet";
// //     // }

// //     window.web3 = new Web3(window.ethereum);
// //     await window.ethereum.request({ method: "eth_requestAccounts" });
// //     const netId = await window.web3.eth.net.getId();

// //     // if (netId.toString() === networks.bsc.chainId) {
// //     //   isItConnected = true;
// //     // } else

// //     if (netId.toString() === networks.bscBuildBear.chainId) {
// //       isItConnected = true;
// //     } else {
// //       isItConnected = false;
// //     }

// //     if (isItConnected) {
// //       return (await getAccounts())[0];
// //     } else {
// //       await handleNetworkSwitch("bscBuildBear"); // Change this line as per your desired default network
// //       return "Wrong network";
// //     }
// //   } catch (error) {
// //     console.log("Error while loading Web3: ", error);
// //     return "No Wallet";
// //   }
// // };
// import Web3 from "web3";

// // Constants to define the supported networks
// const networks = {
//   bsc: {
//     chainId: "97",
//     chainName: "BNB Smart Chain Testnet",
//     nativeCurrency: {
//       name: "BNB Smart Chain Testnet",
//       symbol: "tBNB",
//       decimals: 18,
//     },
//     rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
//     blockExplorerUrls: ["https://testnet.bscscan.com"],
//   },
//   bscBuildBear: {
//     chainId: "11840",
//     chainName: "BuildBear Basic Quarsh Panaka",
//     nativeCurrency: {
//       name: "BB",
//       symbol: "BB ETH",
//       decimals: 18,
//     },
//     rpcUrls: ["https://rpc.buildbear.io/basic-quarsh-panaka-9a3497fb"],
//     blockExplorerUrls: [
//       "https://explorer.buildbear.io/basic-quarsh-panaka-9a3497fb",
//     ],
//   },
// };

// export const connectWallet = async (walletName) => {
//   console.log("walletName", walletName);
//   try {
//     let web3;

//     // Check if Metamask is already connected
//     if (walletName !== "Metamask" && typeof window.ethereum !== "undefined") {
//       throw new Error("Metamask is already connected");
//     }

//     if (walletName === "Metamask") {
//       // Connect with Metamask
//       if (typeof window.ethereum !== "undefined") {
//         web3 = new Web3(window.ethereum);
//         await window.ethereum.enable();
//         const netId = await web3.eth.net.getId();

//         // Check network
//         if (netId.toString() === networks.bsc.chainId) {
//           return web3;
//         } else if (netId.toString() === networks.bscBuildBear.chainId) {
//           return web3;
//         } else {
//           await window.ethereum.request({
//             method: "wallet_addEthereumChain",
//             params: [networks.bsc],
//           });
//           return "Wrong Network";
//         }
//       } else {
//         throw new Error("Metamask not found or not installed");
//       }
//     } else if (walletName === "Trust Wallet") {
//       // Connect with Trust Wallet (Mobile)
//       if (typeof window.ethereum !== "undefined") {
//         web3 = new Web3(window.ethereum);
//         // Additional Trust Wallet-specific logic if needed
//       } else {
//         throw new Error("Trust Wallet not found or not installed");
//       }
//     } else if (walletName === "Ledger") {
//       // Connect with Ledger Wallet
//       // Implement Ledger connection logic here
//     } else if (walletName === "Coinbase") {
//       // Connect with Coinbase Wallet
//       // Implement Coinbase connection logic here
//     }

//     return web3;
//   } catch (error) {
//     console.error("Wallet connection error:", error);
//     return null;
//   }
// };

// export const disconnectWallet = async () => {
//   if (typeof window.ethereum !== "undefined") {
//     await window.ethereum.request({ method: "wallet_requestPermissions" });
//     window.ethereum.on("accountsChanged", () => {
//       // Handle disconnection here
//     });
//   }
// };

// export const switchNetwork = async (web3, networkName) => {
//   try {
//     await web3.eth.requestAccounts();
//     // Pass the chainId as a hexadecimal string with "0x" prefix
//     await web3.eth.send("wallet_switchEthereumChain", {
//       chainId: `0x${networkName}`,
//     });

//     // Handle network switch success
//   } catch (error) {
//     // Handle network switch error
//     console.error("Network switch error:", error);
//   }
// };
