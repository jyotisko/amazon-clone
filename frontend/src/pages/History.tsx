import React, { useState } from 'react';
import Footer from '../components/Footer/Footer';
import Nav from '../components/Nav/Nav';
import HeaderHistory from '../components/History/HeaderHistory';
import Manage from '../components/History/Manage';

const History: React.FC = () => {
  const [showManageHistory, setShowManageHistory] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Nav />
      <main className="main main--history">
        <HeaderHistory onToggleManageHistory={setShowManageHistory} showState={showManageHistory} />
        {showManageHistory && <Manage />}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default History;