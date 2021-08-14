import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency: 'USD',
    symbol: '$',
    multiplier: 1
  },
  reducers: {
    changeCurrency(state, action) {
      state.currency = action.payload.currency;
      state.symbol = action.payload.symbol;
      state.multiplier = action.payload.multiplier;
    }
  }
});

export const currencyActions = currencySlice.actions;
export default currencySlice.reducer;

