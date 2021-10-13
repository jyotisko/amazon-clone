import React, { useState } from 'react';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import SellOnAmazonHeader from '../components/SellOnAmazon/Header';
import SellOnAmazonRegisterPopup from '../components/SellOnAmazon/RegisterPopup';
import WaveImage from '../assets/wave.svg';

const SellOnAmazon: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Nav />
      <main className="main sell-on-amazon">
        <SellOnAmazonHeader setShowPopup={setShowPopup} />
        <img src={WaveImage} alt="Wave" className="sell-on-amazon__wave" />
        {showPopup && <SellOnAmazonRegisterPopup setShowPopup={setShowPopup} />}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default SellOnAmazon;