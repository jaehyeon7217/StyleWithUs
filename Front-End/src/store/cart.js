import { createSlice } from "@reduxjs/toolkit";

//userType => 0: user 1: consultant
const initialCartState = {
  cartItems: [
    
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    getCart(state, action) {
      state.cartItems = action.payload
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;