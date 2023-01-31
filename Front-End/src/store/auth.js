import { createSlice } from "@reduxjs/toolkit";

//userType => 0: user 1: consultant
const initialAuthState = {
  token : "",
  userType: 0,
  userId: "",
  isLogined : false,
  confirmEmail : "",
  emailForResest : "",
  userData : "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    userLogin(state, action) {
      state.token = action.payload.auth_token
      state.userId = action.payload.data.userId
      state.userType = 0;
      state.isLogined = true;
      state.userData = action.payload.data
    },
    consultantLogin(state, action){
      state.token = action.payload.auth_token;
      state.userId = action.payload.data.userId
      state.userType = 1;
      state.isLogined = true;
      state.userData = action.payload.data
    },
    validEmail(state, action){
      state.confirmEmail = action.payload;
    },
    initializeValidEmail(state){
      state.confirmEmail = ""
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