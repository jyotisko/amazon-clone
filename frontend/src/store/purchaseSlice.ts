import { createSlice } from '@reduxjs/toolkit';
import { purchaseStateType } from '../types/stateTypes';

const initialState: purchaseStateType = {
  products: null,
};

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: initialState,
  reducers: {
    configurePurchaseState(state, action) {
      state.products = action.payload.products;
    },
    resetPurchaseState(state) {
      state.products = null;
    }
  }
});

export const purchaseActions = purchaseSlice.actions;
export default purchaseSlice.reducer;
