import React from 'react';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import OrdersItems from '../components/Orders/OrdersItems';

const Orders: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <main className="main main--orders">
        <section className="orders">
          <h1 className="orders__text">Your Orders</h1>
          <OrdersItems />
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Orders;