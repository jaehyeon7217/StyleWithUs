import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import authReducer from "./auth";
import cartReducer from "./cart";

const reducers = combineReducers({
  auth: authReducer, cart: cartReducer,
});

const persistConfig = {
  key : 'root',
  version : 1,
  // 로컬 스토리지 사용
  version : 1,
  storage,
  blacklist: ["cart",],
};

const rootReducer = combineReducers({
  auth: authReudcer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    },
  }),
});

export default store;