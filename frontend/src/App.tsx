import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './store/authSlice';
import Spinner from './components/Utils/Spinner';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const ProductSearch = lazy(() => import('./pages/ProductSearchPage'));
const Features = lazy(() => import('./pages/Features'));

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/v1/users/isLoggedIn', { withCredentials: true });
      if (data.data?.user) dispatch(authActions.login({ user: data.data.user }));
    })();
  }, []);

  return (
    <React.Fragment>
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/product/:id' component={ProductDetail} />
          <Route path='/search' component={ProductSearch} />
          <Route path='/features' component={Features} />
        </Suspense>
      </Switch>
    </React.Fragment>
  );
};

export default App;
