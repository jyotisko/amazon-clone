import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
