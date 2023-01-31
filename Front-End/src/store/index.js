import { configureStore } from "@reduxjs/toolkit";
import storageSession from 'redux-persist/lib/storage/session'
import { combineReducers } from "redux";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import authReducer from "./auth";
import cartReducer from "./cart";

const persistConfig = {
  key : 'root',
  version : 1,
  storage: storageSession,
  blacklist: ["cart",],
};

const rootReducer = combineReducers({
  auth: authReducer, cart: cartReducer,
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