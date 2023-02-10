// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

//userType => 0: user 1: consultant
const initialCartState = {
  cartItems: [
    
  ],
  update: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    getCart(state, action) {
      state.cartItems = action.payload
    },
    updateCart(state, action) {
      state.update = !state.update;
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;