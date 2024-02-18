import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { userReducer } from "./users";
import { postReducer } from "./posts";
import { notificationReducer } from "./notifications";
import { messageReducer } from "./messages";

const reducers = {
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  notification: notificationReducer,
  message: messageReducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
