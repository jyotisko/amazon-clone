import { createSlice } from '@reduxjs/toolkit';
import { searchStateType } from '../types/stateTypes';

const initialState: searchStateType = {
  query: '',
  category: 'all',
  page: 1,
  totalPages: null
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    updateSearch(state, action) {
      state.query = action?.payload?.query || state.query;
      state.category = action?.payload?.category || state.category;
      state.page = action?.payload?.page || state.page;
      state.totalPages = action?.payload?.totalPages || state.totalPages;
    },
    incrementPage(state) {
      state.page = state.page + 1;
    },
    decrementPage(state) {
      state.page = state.page === 1 ? 1 : state.page - 1;
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
