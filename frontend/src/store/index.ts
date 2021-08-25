import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import currencySlice from './currencySlice';
import searchSlice from './searchSlice';
import cartSlice from './cartSlice';
import historySlice from './historySlice';
import purchaseSlice from './purchaseSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    currency: currencySlice,
    search: searchSlice,
    cart: cartSlice,
    history: historySlice,
    purchase: purchaseSlice
  }
});

export default store;