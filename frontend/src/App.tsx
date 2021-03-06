import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/authSlice';
import { historyActions } from './store/historySlice';
import Spinner from './components/Utils/Spinner';
import { currencyActions } from './store/currencySlice';
import { purchaseActions } from './store/purchaseSlice';
import { authStateType } from './types/stateTypes';

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
const Buy = lazy(() => import('./pages/Buy'));
const Page404 = lazy(() => import('./pages/404'));
const Nodes = lazy(() => import('./pages/Nodes'));
const Orders = lazy(() => import('./pages/Orders'));
const SellOnAmazon = lazy(() => import('./pages/SellOnAmazon'));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const auth: authStateType = useSelector((state: RootStateOrAny) => state.auth);

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
      dispatch(currencyActions.changeCurrency({ ...JSON.parse(localStorage.getItem('currency')!) }));
    }
  };

  const setPurchaseState = () => {
    if (window.location.pathname.startsWith('/buy')) return;
    dispatch(purchaseActions.resetPurchaseState());
  };

  useEffect(() => {
    setupLocalStorage();
    setCurrencyState();
    setHistoryState();
    setPurchaseState();
    (async () => {
      if (auth.isLoggedIn || auth.user) return;
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users/isLoggedIn`, {
        withCredentials: true
      });
      if (data.data?.user) dispatch(authActions.login({ user: data.data.user }));
    })();
  }, []);

  return (
    <React.Fragment>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/product/:id' exact component={ProductDetail} />
          <Route path='/search' exact component={ProductSearch} />
          <Route path='/features' exact component={Features} />
          <Route path='/wishlist' exact component={Wishlist} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/history' exact component={History} />
          <Route path='/currency' exact component={Currency} />
          <Route path='/buy' exact component={Buy} />
          <Route path='/nodes/:node' exact component={Nodes} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/sell-on-amazon' exact component={SellOnAmazon} />
          <Route component={Page404} />
        </Switch>
      </Suspense>
    </React.Fragment>
  );
};

export default App;
