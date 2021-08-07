import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav/Nav';

const App = () => {
  return (
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
