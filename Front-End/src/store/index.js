import { configureStore } from "@reduxjs/toolkit";
// import storageSession from 'redux-persist/lib/storage/session'
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import authReducer from "./auth";
import shopReducer from "./shop";
import cartReducer from "./cart";
import chatReducer from "./chat";

const persistConfig = {
  key : 'root',
  version : 1,
  storage,
  blacklist: ["chat"],
};

const rootReducer = combineReducers({
  auth: authReducer, shop: shopReducer, cart: cartReducer, chat: chatReducer,
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