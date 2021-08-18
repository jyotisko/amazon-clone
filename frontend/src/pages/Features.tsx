import React from 'react';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import FeaturesHeader from '../components/Features/FeaturesHeader';
import WorldwideShipping from '../components/Features/WorldwideShipping';
import SecurePayments from '../components/Features/SecurePayments';
import Deals from '../components/Features/Deals';

const Features: React.FC = () => {
  return (
    <React.Fragment>
      <Nav />
      <main className="main main--features">
        <FeaturesHeader />
        <WorldwideShipping />
        <SecurePayments />
        <Deals />
        <h1 className="main--features__big-text">NOW LET'S GET SHOPPING!</h1>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Features;