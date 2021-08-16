import { createSlice } from '@reduxjs/toolkit';
import { authStateType } from '../types/stateTypes';

const initialState: authStateType = {
  user: null,
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
