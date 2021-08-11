import React from 'react';
import HeaderBanner from '../components/Home/HeaderBanner';
import Featured from '../components/Home/Featured';
import Rows from '../components/Home/Rows';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';

const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <div className="home">
        <HeaderBanner />
        <Featured />
        <Rows />
      </div>
      <Footer />
    </>
  );
}

export default Home;