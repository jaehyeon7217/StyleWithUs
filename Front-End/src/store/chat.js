import { createSlice } from "@reduxjs/toolkit";

//userType => 0: user 1: consultant
const initialChatState = {
  chattings: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    addChatting(state, action) {
      state.chattings.push(action.payload);
    },
    leaveChatting(state, action) {
      state.chattings = [];
    }
  }
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;