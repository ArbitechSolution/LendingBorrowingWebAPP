import React from "react";
import logo from "../image/AFT.png";
import wallet from "../image/wallet.svg";
import { Link } from "react-router-dom";
import { GrTwitter } from "react-icons/gr";
import { SiSubstack } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";

import { connectionAction, web3Actions } from "../../Redux/connection/actions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Web3 from "web3";

function Footer() {
  const dispatch = useDispatch();
  const acc = useSelector((state) => state.connect?.connection);

  const connectWallet = async () => {
    dispatch(connectionAction());
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      dispatch(web3Actions(web3)); // Pass the Web3 instance to Redux
    }
  };

  const navigate = useNavigate();

  return (
    <footer
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "20px 0",
        marginTop: "50px",
      }}
    >
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-center mb-2">Quick Links</h5>
            <ul
              className="d-flex flex-column gap-2"
              style={{ listStyle: "none" }}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/Stake">Stake</Link>
              </li>
              <li>
                <Link to="/Lend">Lending</Link>
              </li>
              <li>
                <Link to="/Borrow">Borrowing</Link>
              </li>
            </ul>
          </div>

          {/* Second Column: Social Media */}
          <div className="col-md-4 text-center ">
            <h5 className="mb-2">Follow Us</h5>
            {/* Add your social media icons and links here */}
            <div className="d-flex justify-content-center gap-4 social-icons">
              <a href="" className="fs-3">
                <GrTwitter />
              </a>
              <a href="" className="fs-3">
                <SiSubstack />
              </a>
              <a href="" className="fs-3">
                <FaGithub />
              </a>
              <a href="" className="fs-3">
                <BsTelegram />
              </a>
              <a href="" className="fs-3">
                <BsDiscord />
              </a>
            </div>
          </div>

          {/* Third Column: Logo and Connect Wallet */}
          <div className="col-md-4 text-center">
            <h5 className="mb-2">ArcherFi</h5>
            <div className="d-flex flex-column justify-content-center align-items-end gap-3">
              <img src={logo} alt="" width={100} />
              <button
                className="btn btnnn "
                type="button"
                onClick={connectWallet}
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
