import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './store/authSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/v1/users/isLoggedIn', { withCredentials: true });
      if (data.data?.user) dispatch(authActions.login({ user: data.data.user }));
    })();
  }, [dispatch]);

  return (
    <React.Fragment>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
