import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";

const reducers = {
  auth: authReducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
