import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getNotifications } from "./api_actions";

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getNotifications
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
      })
      .addCase(getNotifications.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error);
      });
  },
});
export const notificationReducer = notificationSlice.reducer;
