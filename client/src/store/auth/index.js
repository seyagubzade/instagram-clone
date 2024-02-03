import { createSlice } from "@reduxjs/toolkit";
import { LoginAPI, RegisterAPI } from "./api_request";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
    message:null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // LoginAPI
      .addCase(LoginAPI.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(LoginAPI.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(LoginAPI.rejected, (state, action) => {
        console.log("first", action.payload)
        state.error = action.payload;
        state.loading = false;
      })

    //   RegisterAPI
      .addCase(RegisterAPI.fulfilled, (state, action) => {
        console.log("RegisterAPI success>>", action.payload)
        state.data = action.payload.payload;
        state.loading = false;
      })
      .addCase(RegisterAPI.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(RegisterAPI.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});
export const authReducer = authSlice.reducer;
