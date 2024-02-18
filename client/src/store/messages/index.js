import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getMessages, sendMessage } from "./api_actions";

const messageSlice = createSlice({
  name: "messageSlice",
  initialState: {
    message: [],
    arrivalMessage: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // message
      .addCase(getMessages.fulfilled, (state, action) => {
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(getMessages.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error);
      })
      // message
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.arrivalMessage = action.payload;
        state.loading = false;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error);
      })
  },
});
export const messageReducer = messageSlice.reducer;
