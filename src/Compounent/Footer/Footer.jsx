import React from 'react'
import logo from "../image/logo.svg";
import { GrTwitter } from 'react-icons/gr';
import { SiSubstack } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';
import { BsTelegram } from 'react-icons/bs';
import { BsDiscord } from 'react-icons/bs';
import "./footer.css"
function Footer() {
  return (
    <div className='color text-center mt-4 pt-3'>
        <div className="w_25 mx-auto">
        <img src={logo}  style={{width:"140px "}} alt="" />
    </div>
    <div className="icons my-3  " >
        <a href="" className='fs-3'>
            <GrTwitter/>
        </a>
        <a href="" className='fs-3'>
            <SiSubstack/>
        </a>
        <a href="" className='fs-3'>
            <FaGithub/>
        </a>
        <a href="" className='fs-3'>
            <BsTelegram/>
        </a>
        <a href="" className='fs-3'>
            <BsDiscord/>
        </a>
    </div>
    <p className='my-3'>Media Kit</p>
    </div>
  )
}

export default Footer