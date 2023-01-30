import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import authReducer from "./auth";
import cartReducer from "./cart";

const reducers = combineReducers({
  auth: authReducer, cart: cartReducer,
});

const persistConfig = {
  key : 'root',
  // 로컬 스토리지 사용
  version : 1,
  storage,
  blacklist: ["cart",],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;