import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import currencySlice from './currencySlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    currency: currencySlice
  }
});

export default store;