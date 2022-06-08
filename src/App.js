import React from 'react';
import './Styles/Master.css';
import Navbar from './countiners/Navbar';
import Home from './countiners/Pages/Home';
import Explore from './countiners/Pages/Explore';
import Contract from './countiners/Pages/Contract';
import Create from './countiners/Pages/Create';
import Footer from './countiners/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateCollection from './countiners/Pages/CreateCollection';
import ShowNFT from './countiners/Pages/ShowNFT';
import ShowCollection from './countiners/Pages/ShowCollection';
import Alert from './components/Alert';
import { useSelector } from 'react-redux';
import { selectAlert } from './features/NFT/NFTSlice';
import { selectshowModalwallet } from './features/NFT/NFTSlice';
import SetConectWallet from './components/SetConectWallet';
import PageNotFind from './countiners/Pages/PageNotFind';
function App() {
  const alertProp = useSelector(selectAlert);
  const showModalwallet = useSelector(selectshowModalwallet);
  return (
    <>
    <BrowserRouter>
     <Navbar />
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Explore' element={<Explore />} />
        <Route path='/Contract' element={<Contract/>} />
        <Route path='/Create' element={<Create />} />
        <Route path='/CreateCollection' element={<CreateCollection />} />
        <Route path='/ShowNFT/:chain/:address/:tokenId' element={<ShowNFT />} />
        <Route path='/Collection/:nameCollection' element={<ShowCollection/>} />
        <Route path='*' element={<PageNotFind/>} />
      </Routes>
      </BrowserRouter>
      <Footer/>
      {alertProp.show && <Alert info={alertProp}></Alert>}
      {showModalwallet&&<SetConectWallet></SetConectWallet>}
    </>
  );
}

export default App;
