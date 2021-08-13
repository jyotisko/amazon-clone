import React, { useEffect } from 'react';
import HeaderBanner from '../components/Home/HeaderBanner';
import Featured from '../components/Home/Featured';
import Rows from '../components/Home/Rows';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';

const Home: React.FC = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (Boolean(urlParams.get('login'))) window.location.assign('/');
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <div className="home">
        <HeaderBanner />
        <Featured />
        <Rows />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Home;