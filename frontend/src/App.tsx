import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
