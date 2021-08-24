import { createSlice } from '@reduxjs/toolkit';
import { currencyStateType } from '../types/stateTypes';

const initialState: currencyStateType = {
  currency: 'USD',
  symbol: '$',
  multiplier: 1,
  currencyName: 'US Dollar'
};

const currencySlice = createSlice({
  name: 'currency',
  initialState: initialState,
  reducers: {
    changeCurrency(state, action) {
      state.currency = action.payload.currency || state.currency;
      state.symbol = action.payload.symbol || state.symbol;
      state.multiplier = action.payload.multiplier || state.multiplier;
      state.currencyName = action.payload.currencyName || state.currencyName;
    }
  }
});

export const currencyActions = currencySlice.actions;
export default currencySlice.reducer;

