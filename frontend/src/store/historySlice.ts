import { createSlice } from '@reduxjs/toolkit';
import { ProductResponseType } from '../types/APIResponseTypes';
import { historyStateType } from '../types/stateTypes';
import { MAX_HISTORY_CAPACITY } from '../utils';

const initialState: historyStateType = {
  products: [],
  captureHistory: true
};

const storeProductsInLocalStorage = (products: ProductResponseType[]) => {
  localStorage.setItem('history', JSON.stringify(products));
};

const historySlice = createSlice({
  name: 'history',
  initialState: initialState,
  reducers: {
    configureHistory(state, action) {
      state.products = action.payload.products;
      state.captureHistory = action.payload.captureHistory;
    },
    addProductToHistory(state, action) {
      // Check if history is enabled.
      if (!state.captureHistory) return;

      // If product already exists, update it.
      const indexIfProductAlreadyExists = state.products.findIndex((product) => product._id === action.payload.product._id);
      if (indexIfProductAlreadyExists >= 0) {
        const updatedProducts = state.products.map((product, index) => {
          if (index === indexIfProductAlreadyExists) return action.payload.product;
          return product;
        });
        state.products = updatedProducts;
        storeProductsInLocalStorage(updatedProducts);
        return;
      }

      // If product doesn't exist, add it.
      const newProducts = ([action.payload.product, ...state.products]).slice(0, MAX_HISTORY_CAPACITY);
      storeProductsInLocalStorage(newProducts);
      state.products = newProducts;
    },
    removeProductFromHistory(state, action) {
      const newProducts = state.products.filter((product) => product._id !== action.payload.productId);
      storeProductsInLocalStorage(newProducts);
      state.products = newProducts;
    },
    toggleCapturingState(state) {
      const currentState = state.captureHistory;
      localStorage.setItem('captureHistory', JSON.stringify(!currentState));
      state.captureHistory = !currentState;
    },
    removeAllProductsFromHistory(state) {
      storeProductsInLocalStorage([]);
      state.products = [];
    }
  }
});

export const historyActions = historySlice.actions;
export default historySlice.reducer;
