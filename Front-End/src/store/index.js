import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import authReudcer from "./auth";

const reducers = combineReducers({
  auth: authReudcer,
});

const persistConfig = {
  key : 'root',
  // 로컬 스토리지 사용
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;