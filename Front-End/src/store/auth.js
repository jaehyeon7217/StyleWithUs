import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token : null,
  isLogined : false,
};

const authSlice = createSlice({
  
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLogined = true;
    },
    logout(state) {
      state.token = null;
      state.isLogined = false;
    },
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;