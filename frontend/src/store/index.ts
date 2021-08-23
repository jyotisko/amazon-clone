import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import currencySlice from './currencySlice';
import searchSlice from './searchSlice';
import cartSlice from './cartSlice';
import historySlice from './historySlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    currency: currencySlice,
    search: searchSlice,
    cart: cartSlice,
    history: historySlice
  }
});

export default store;