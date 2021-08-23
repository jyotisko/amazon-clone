import { createSlice } from '@reduxjs/toolkit';
import { cartStateType } from '../types/stateTypes';

const initialState: cartStateType = {
  items: null,
  totalPrice: 0,
  totalItems: 0
};

const getTotalPrice = (items: any) => {
  return Number(items.reduce((acc: number, item: any) => acc + (item.quantity * item.product.priceOffer), 0));
};

const getTotalItems = (items: any) => {
  return Number(items.reduce((acc: number, item: any) => acc + item.quantity, 0));
};

const updateState = (state: cartStateType, items: any) => {
  state.items = items;
  state.totalPrice = getTotalPrice(items);
  state.totalItems = getTotalItems(items);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    pushItemsToCart(state, action) {
      const items = action.payload.items;
      updateState(state, items);
    },
    addItemToCart(state, action) {
      if (!state.items) return;
      const newItems = [...state.items, action.payload.item];
      updateState(state, newItems);
    },
    removeItemFromCart(state, action) {
      if (!state.items) return;
      const newItems = state.items.filter((item) => item.product._id !== action.payload.productId);
      updateState(state, newItems);
    },
    changeItemQuantity(state, action) {
      if (!state.items) return;
      const newItems = state.items.map((item) => {
        if (item.product._id === action.payload.productId) return {
          quantity: action.payload.quantity,
          product: item.product
        }
        else return item;
      });
      updateState(state, newItems);
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;