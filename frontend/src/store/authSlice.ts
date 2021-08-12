import { createSlice } from '@reduxjs/toolkit';
import { UserResponseType } from '../types/APIResponseTypes';

interface InitialStateType {
  user: null | UserResponseType,
  isLoggedIn: boolean
}

const initialState: InitialStateType = {
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
