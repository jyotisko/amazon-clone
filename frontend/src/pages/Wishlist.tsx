import React from 'react';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import ContainerBox from '../components/Wishlist/ContainerBox';

const Wishlist: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <main className="main main--wishlist">
        <ContainerBox />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Wishlist;