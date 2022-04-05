import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./services/auth";
import userReducer from "./services/userSlice";
import postsReducer from "./services/postsSlice";
import usersReducer from "./services/user";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  user: usersReducer,
  posts: postsReducer,
});
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export let persistor = persistStore(store);

export default store;
