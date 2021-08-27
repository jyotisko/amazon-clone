import React from 'react';
import Dog404 from '../components/404/Dog404';
import Message404 from '../components/404/Message404';
import Nav404 from '../components/404/Nav404';

const Page404: React.FC = () => {
  return (
    <React.Fragment>
      <Nav404 />
      <main className="main main--404">
        <Message404 />
        <Dog404 />
      </main>
    </React.Fragment>
  );
};

export default Page404;