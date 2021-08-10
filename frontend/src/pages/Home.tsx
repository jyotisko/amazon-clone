import React from 'react';
import HeaderBanner from '../components/Home/HeaderBanner';
import Featured from '../components/Home/Featured';
import Rows from '../components/Home/Rows';

const Home: React.FC = () => {
  return (
    <div className="home">
      <HeaderBanner />
      <Featured />
      <Rows />
    </div>
  );
}

export default Home;