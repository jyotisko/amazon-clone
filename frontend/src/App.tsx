import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './store/authSlice';
import { historyActions } from './store/historySlice';
import Spinner from './components/Utils/Spinner';
import { currencyActions } from './store/currencySlice';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const ProductSearch = lazy(() => import('./pages/ProductSearchPage'));
const Features = lazy(() => import('./pages/Features'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Cart = lazy(() => import('./pages/Cart'));
const History = lazy(() => import('./pages/History'));
const Currency = lazy(() => import('./pages/Currency'));

const App: React.FC = () => {
  const dispatch = useDispatch();

  // Setup history for first time visitors
  const setupLocalStorage = () => {
    if (!localStorage.getItem('history')) localStorage.setItem('history', JSON.stringify([]));
    if (localStorage.getItem('captureHistory') === null) localStorage.setItem('captureHistory', 'true');
  };

  const setHistoryState = () => {
    const products = JSON.parse(localStorage.getItem('history')!);
    const captureHistory = JSON.parse(localStorage.getItem('captureHistory')!);
    dispatch(historyActions.configureHistory({
      products: products,
      captureHistory: captureHistory
    }))
  };

  const setCurrencyState = () => {
    if (localStorage.getItem('currency')) {
      dispatch(currencyActions.changeCurrency({ ...JSON.parse(localStorage.getItem('currency')!) }))
    }
  };

  useEffect(() => {
    setupLocalStorage();
    setCurrencyState();
    setHistoryState();
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
          <Route path='/wishlist' component={Wishlist} />
          <Route path='/cart' component={Cart} />
          <Route path='/history' component={History} />
          <Route path='/currency' component={Currency} />
        </Suspense>
      </Switch>
    </React.Fragment>
  );
};

export default App;
