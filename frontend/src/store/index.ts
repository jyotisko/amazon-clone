import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import currencySlice from './currencySlice';
import searchSlice from './searchSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    currency: currencySlice,
    search: searchSlice
  }
});

export default store;