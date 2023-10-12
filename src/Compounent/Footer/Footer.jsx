import React from "react";
import logo from "../image/AFT.png";
import { GrTwitter } from "react-icons/gr";
import { SiSubstack } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import "./footer.css";
function Footer() {
  return (
    // <div className="color text-center mt-4 pt-3">
    <div className="text-center mt-4 py-3" style={{backgroundColor:"black"}}>
      <div className="w_25 mx-auto">
        <img src={logo} style={{ width: "140px " }} alt="" />
      </div>
      <div className="icons my-3  ">
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
  );
}

export default Footer;
