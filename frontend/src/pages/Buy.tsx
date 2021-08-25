import React from 'react';
import BuyForm from '../components/Buy/BuyForm';
import BuyNav from '../components/Buy/BuyNav';
import Footer from '../components/Footer/Footer';

const Buy: React.FC = () => {
  return (
    <React.Fragment>
      <BuyNav />
      <main className="main main--buy">
        <BuyForm />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Buy;