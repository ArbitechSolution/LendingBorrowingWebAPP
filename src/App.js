import "./App.css";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashbord from "./Compounent/Dashbord/Dashbord";
import Eran from "./Compounent/Eran/Eran";
import Buy from "./Compounent/Buy/Buy";
import Referrals from "./Compounent/Referrals/Referrals";
import Swap from "./Compounent/Swap/Swap";
import Lend from "./Compounent/Lend/Lend";
import Borrow from "./Compounent/Borrow/Borrow";
import Hero from "./Compounent/Hero/Hero";
import LogIn from "./Compounent/LogIn/LogIn";
import Signup from "./Compounent/Signup/Signup";
import ProtectedRoute from "./Compounent/ProtectedRoutes/ProtectedRoute";
import ForgetPassword from "./Compounent/ForgetPassword/ForgetPassword";
import ResetPassword from "./Compounent/ResetPassword/ResetPassword";
import Profile from "./Compounent/UserProfile/Profile";
import ModalComponent from "./Compounent/Modal/ModalComponent";
// import MetaMask from "./assets/images/metamask.png";
// import TrustWallet from "./assets/images/trustwallet.png";
// import Ledger from "./assets/images/ledger.png";
// import Coinbase from "./assets/images/coinbase.png";
// import { useDispatch, useSelector } from "react-redux";
// import { connectWallet, disconnectWallet, switchNetwork } from "./apis/api";
// import { connectionAction, web3Actions } from "../src/Redux/connection/actions";
// import Web3 from "web3";
import WalletModal from "./Compounent/WalletModal/WalletModal";

function App() {
  // const dispatch = useDispatch();
  // const acc = useSelector((state) => state.connect?.connection);
  // const web3 = useSelector((state) => state.connect?.web3);
  // const [loader, setLoader] = useState({
  //   loading: false,
  //   btnId: null,
  // });

  // const wallets = [
  //   {
  //     id: 1,
  //     name: "Metamask",
  //     image: MetaMask,
  //   },
  //   {
  //     id: 2,
  //     name: "Trust Wallet",
  //     image: TrustWallet,
  //   },
  //   {
  //     id: 3,
  //     name: "Ledger",
  //     image: Ledger,
  //   },
  //   {
  //     id: 4,
  //     name: "Coinbase",
  //     image: Coinbase,
  //   },
  // ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const handleModal = () => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
  };

  const handleWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        closeOnClick={true}
        limit={1}
      />

      {/* Wallet Modal */}
      <WalletModal />

      <ModalComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/Signup"
            element={<Signup handleModal={handleModal} />}
          />

          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route
            path="/resetPassword/:resetToken"
            element={<ResetPassword />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={<Hero />}
                handleWalletModal={handleWalletModal}
              />
            }
          />
          <Route
            path="/LandingPage"
            element={
              <ProtectedRoute
                element={<Hero />}
                handleWalletModal={handleWalletModal}
              />
            }
          />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute
                element={<Dashbord />}
                handleWalletModal={handleWalletModal}
              />
            }
          />
          <Route
            path="/Stake"
            element={
              <ProtectedRoute
                element={<Eran />}
                handleWalletModal={handleWalletModal}
              />
            }
          />
          <Route
            path="/Buy"
            element={
              <ProtectedRoute
                element={<Buy />}
                handleWalletModal={handleWalletModal}
              />
            }
          />
          <Route
            path="/Referrals"
            element={
              <ProtectedRoute
                element={<Referrals />}
                handleWalletModal={handleWalletModal}
              />
            }
          />
          <Route
            path="/Swap"
            element={
              <ProtectedRoute
                element={<Swap />}
                handleWalletModal={handleWalletModal}
              />
            }
          />
          <Route
            path="/Lend"
            element={
              <ProtectedRoute
                element={<Lend />}
                handleWalletModal={handleWalletModal}
              />
            }
          />
          <Route
            path="/Borrow"
            element={
              <ProtectedRoute
                element={<Borrow />}
                handleWalletModal={handleWalletModal}
              />
            }
          />

          <Route
            path="/Profile"
            element={
              <ProtectedRoute
                element={<Profile />}
                handleWalletModal={handleWalletModal}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
