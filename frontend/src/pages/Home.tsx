import React from 'react';
import HeaderBanner from '../components/Home/HeaderBanner';
import Featured from '../components/Home/Featured';

const Home: React.FC = () => {
  return (
    <div className="home">
      <HeaderBanner />
      <Featured />
    </div>
  );
}

export default Home;