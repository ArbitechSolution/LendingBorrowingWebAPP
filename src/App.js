import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Composition_Table from './Compounent/Composition_Table/Composition_Table';

import Das from "./Compounent/Dash_Stats/Dash_Stats"
import Footer from './Compounent/Footer/Footer';
import Navbar from './Compounent/Navbar/Navbar';
import Token from './Compounent/Token/Token';
import Dashbord from './Compounent/Dashbord/Dashbord';
import Eran from './Compounent/Eran/Eran';
import Buy from './Compounent/Buy/Buy';
import Referrals from './Compounent/Referrals/Referrals';
import Swap from './Compounent/Composition_Table/Swap/Swap';

import Lend from './Compounent/Lend/Lend';
import Borrow from './Compounent/Borrow/Borrow';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Dashbord />}/>
      <Route path="/Stake" element={<Eran />}/>
      <Route path="/Buy" element={<Buy />}/>
      <Route path="/Referrals" element={<Referrals />}/>
      <Route path="/Swap" element={<Swap />}/>
      <Route path="/Lend" element={<Lend />}/>
      <Route path="/Borrow" element={<Borrow />}/>
      </Routes>
      <Footer/>
      </BrowserRouter>



    </div>
  );
}

export default App;
