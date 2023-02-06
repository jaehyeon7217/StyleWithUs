import { createSlice } from "@reduxjs/toolkit";

//userType => 0: user 1: consultant
const initialAuthState = {
  token : "",
  userType: 0,
  userId: "",
  isLogined : false,
  confirmEmail : "",
  resetCode : {},
  userData : "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    adminLogin(state, action){
      state.token = action.payload.auth_token;
      state.userType = 2;
      state.isLogined = true;
    },
    userLogin(state, action) {
      state.token = action.payload.auth_token
      state.userId = action.payload.data.userId
      state.userType = 0;
      state.isLogined = true;
      state.userData = action.payload.data;
    },
    consultantLogin(state, action){
      state.token = action.payload.auth_token;
      state.userId = action.payload.data.userId
      state.userType = 1;
      state.isLogined = true;
      state.userData = action.payload.data;
    },
    validEmail(state, action){
      state.confirmEmail = action.payload;
    },
    passwordReset(state, action){
      state.resetCode = action.payload;
    },
    getMyData(state, action) {
      state.userData = action.payload;
    },
    logout(state, action) {
      state.token = action.payload
      state.userType = 0;
      state.userId = action.payload
      state.isLogined = false;
      state.confirmEmail = action.payload
      state.userData = action.payload
    },
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;