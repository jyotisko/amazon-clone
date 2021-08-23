import React from 'react';
import Checkout from '../components/Cart/Checkout';
import Items from '../components/Cart/Items';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';

const Cart: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <main className="main main--cart">
        <Items />
        <Checkout />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Cart;