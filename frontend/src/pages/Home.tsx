import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchActions } from '../store/searchSlice';
import HeaderBanner from '../components/Home/HeaderBanner';
import Featured from '../components/Home/Featured';
import Rows from '../components/Home/Rows';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchActions.resetSearch());
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