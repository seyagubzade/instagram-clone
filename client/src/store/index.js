import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { userReducer } from "./users";

const reducers = {
  auth: authReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
