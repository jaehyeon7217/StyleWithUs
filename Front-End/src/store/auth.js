import { createSlice } from "@reduxjs/toolkit";

//userType => 0: user 1: consultant
const initialAuthState = {
  token : "",
  userType: 0,
  isLogined : false,
  confirmEmail : "",
  userData : "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    userLogin(state, action) {
      state.token = action.payload;
      state.userType = 0;
      state.isLogined = true;
    },
    consultantLogin(state, action){
      state.token = action.payload;
      state.userType = 1;
      state.isLogined = true;
    },
    logout(state) {
      state.token = null;
      state.isLogined = false;
      state.userType = 0;
      state.userData = null;
    },
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;