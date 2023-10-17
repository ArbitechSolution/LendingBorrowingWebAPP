import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Compounent/Footer/Footer";
import Navbar from "./Compounent/Navbar/Navbar";
import Dashbord from "./Compounent/Dashbord/Dashbord";
import Eran from "./Compounent/Eran/Eran";
import Buy from "./Compounent/Buy/Buy";
import Referrals from "./Compounent/Referrals/Referrals";
import Swap from "./Compounent/Composition_Table/Swap/Swap";
import Lend from "./Compounent/Lend/Lend";
import Borrow from "./Compounent/Borrow/Borrow";
import Hero from "./Compounent/Hero/Hero";
import LogIn from "./Compounent/LogIn/LogIn";
import Signup from "./Compounent/Signup/Signup";
import ProtectedRoute from "./Compounent/ProtectedRoutes/ProtectedRoute";
import ForgetPassword from "./Compounent/ForgetPassword/ForgetPassword";
import ResetPassword from "./Compounent/ResetPassword/ResetPassword";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        closeOnClick={true}
        limit={1}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/Signup" element={<Signup />} />

          {/* i want to naviagte to "/forgetPassword?email=" + credentials.email */}
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route
            path="/resetPassword/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/" element={<ProtectedRoute element={<Hero />} />} />
          <Route
            path="/LandingPage"
            element={<ProtectedRoute element={<Hero />} />}
          />
          <Route
            path="/Dashboard"
            element={<ProtectedRoute element={<Dashbord />} />}
          />
          <Route
            path="/Stake"
            element={<ProtectedRoute element={<Eran />} />}
          />
          <Route path="/Buy" element={<ProtectedRoute element={<Buy />} />} />
          <Route
            path="/Referrals"
            element={<ProtectedRoute element={<Referrals />} />}
          />
          <Route path="/Swap" element={<ProtectedRoute element={<Swap />} />} />
          <Route path="/Lend" element={<ProtectedRoute element={<Lend />} />} />
          <Route
            path="/Borrow"
            element={<ProtectedRoute element={<Borrow />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
