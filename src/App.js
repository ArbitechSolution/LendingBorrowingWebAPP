import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Composition_Table from "./Compounent/Composition_Table/Composition_Table";
import { ToastContainer } from "react-toastify";
import Das from "./Compounent/Dash_Stats/Dash_Stats";
import Footer from "./Compounent/Footer/Footer";
import Navbar from "./Compounent/Navbar/Navbar";
import Token from "./Compounent/Token/Token";
import Dashbord from "./Compounent/Dashbord/Dashbord";
import Eran from "./Compounent/Eran/Eran";
import Buy from "./Compounent/Buy/Buy";
import Referrals from "./Compounent/Referrals/Referrals";
import Swap from "./Compounent/Composition_Table/Swap/Swap";
import Lend from "./Compounent/Lend/Lend";
import Borrow from "./Compounent/Borrow/Borrow";
import Hero from "./Compounent/Hero/Hero";
import LogIn from "./Compounent/LogIn/LogIn";
import { useEffect } from "react";
// import Protected from "./Compounent/Protected/Protected";

function App() {
  let IsLogin;
  useEffect(()=>
  {
    IsLogin = localStorage.getItem("IsLogin");
  },[IsLogin]);
  return (
    <div className="App">
      <BrowserRouter>
      { window.location.pathname === "/" ?null:<Navbar/>}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          closeOnClick={true}
          limit={1}
        />
        {/* <LogIn/> */}
        {/* <Protected IsLogin={IsLogin}> */}
        <Routes>
          <Route path="/" element={<LogIn/>} />
          <Route path="/LandingPage" element={<Hero />} />
          <Route path="/Dashboard" element={<Dashbord />} />
          <Route path="/Stake" element={<Eran />} />
          <Route path="/Buy" element={<Buy />} />
          <Route path="/Referrals" element={<Referrals />} />
          <Route path="/Swap" element={<Swap />} />
          <Route path="/Lend" element={<Lend  />} />
          <Route path="/Borrow" element={<Borrow  />} />
        </Routes>
      { window.location.pathname === "/" ?null:<Footer/>}
        {/* </Protected> */}
      </BrowserRouter>
    </div>
  );
}

export default App;