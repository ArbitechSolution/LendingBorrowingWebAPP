import React, { useEffect } from "react";
import logo from "../image/AFT.png";
import wallet from "../image/wallet.svg";
import drop from "../image/drop.jpg";
import "./Navbar.css";
import { connectionAction, web3Actions, disconnectAction } from "../../Redux/connection/actions";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Web3 from "web3";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

function Navbar({ handleWalletModal }) {
  const { address, isConnected, provider, disconnect } = useWeb3ModalAccount();
  const dispatch = useDispatch();
  const acc = useSelector((state) => state.connect?.connection);

  useEffect(() => {
    if (address && isConnected) {
      dispatch(connectionAction(address));

      if (window.ethereum) {
        console.log("address", address);
        const web3 = new Web3(window.ethereum);
        dispatch(web3Actions(web3)); // Pass the Web3 instance to Redux
      }
    }else{
      dispatch(disconnectAction());
    }
  }, [address, isConnected]);
    

  const navigate = useNavigate();
  const { open } = useWeb3Modal();

  const handleLogOut = (e) => {
    e.preventDefault();
    navigate("/Login");
    localStorage.removeItem("aftJwtToken");
  };

  useEffect(() => {
    // On path change, add "active" class to that pathname class
    const pathname = window.location.pathname;
    const path = pathname === "/" ? "LandingPage" : pathname.substring(1);

    const navLinks = document.querySelectorAll(".nav-item");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.classList.contains(path)) {
        link.classList.add("active");
      }
    });
  }, []);

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light text-white p-0">
        <div className="container-fluid px-2 px-md-5">
          <Link className="navbar-brand" to="/LandingPage">
            <img src={logo} alt="" width={100} />
          </Link>
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon bg-white " />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/Dashboard">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/Swap">
                  Swap
                </Link>
              </li>

              {/*
              <li className="nav-item">
                <Link className="nav-link " to="/Buy">
                  Buy
                </Link>
              </li> */}

              <li className="nav-item">
                <Link className="nav-link" to="/Stake">
                  Stake
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/Lend">
                  Lending
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/Borrow">
                  Borrowing
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Referrals">
                  Referrals
                </Link>
              </li> */}
            </ul>
            <form
              className="d-flex justify-content-evenly "
              style={{ gap: "10px " }}
            >
              {/* <button className="btn btnnn primary" type="button">
                Trade
              </button> */}
              <button
                className="btn btnnn "
                type="button"
                onClick={() => open()}
              >
                <img src={wallet} alt="" />{" "}
                {acc
                  ? acc === "Connect Wallet"
                    ? "Connect Wallet"
                    : acc.substring(0, 4) +
                      "..." +
                      acc?.substring(acc.length - 4)
                  : null}
              </button>
              <Dropdown>
                <Dropdown.Toggle
                  className="btn dp-toogle d-flex align-items-center"
                  type="button"
                >
                  <Dropdown.Menu
                    className="dp-menu"
                    style={{ backgroundColor: "rgb(0, 6, 60)" }}
                  >
                    <Dropdown.Item
                      className="text-white dp-item"
                      onClick={() => navigate("/Profile")}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-white dp-item"
                      href="#/action-3"
                      onClick={handleLogOut}
                    >
                      LogOut
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  <img src={drop} alt="" className="me-1 drop" />
                  <span className="border-start ">
                    <svg
                      className=" mb-1"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 20 20"
                      color="white"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "white" }}
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                  </span>
                </Dropdown.Toggle>
              </Dropdown>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
