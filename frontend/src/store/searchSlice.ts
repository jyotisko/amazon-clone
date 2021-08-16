import { createSlice } from '@reduxjs/toolkit';
import { searchStateType } from '../types/stateTypes';

const initialState: searchStateType = {
  query: '',
  category: 'all',
  page: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    updateSearch(state, action) {
      state.query = action?.payload?.query || state.query;
      state.category = action?.payload?.category || state.category;
    },
    incrementPage(state) {
      state.page = state.page++;
    },
    decrementPage(state) {
      state.page = state.page--;
    },
    resetSearch(state) {
      state.query = '';
      state.category = '';
      state.page = 1;
    }
  }
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
