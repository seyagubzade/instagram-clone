import { createSlice } from "@reduxjs/toolkit";
import { LoginAPI, RegisterAPI, deleteUser, followUser, getAllUsers, getUserById, searchUserByUsername, unfollowUser, updateUserProfile } from "./api_request";
import toast from "react-hot-toast";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
    message:null,
    currentData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // getAllUsers
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error)
      })
    // getUserById
      .addCase(getUserById.fulfilled, (state, action) => {
        console.log("getUserById.fulfilled", action.payload)
        state.currentData = action.payload;
        state.loading = false;
      })
      .addCase(getUserById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        // toast.error(state.error.message)
      })
    // getUserById
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.message = action.payload;
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error.message)
      })
    // searchUserByUsername
      .addCase(searchUserByUsername.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(searchUserByUsername.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchUserByUsername.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error.message)
      })
    // updateUserProfile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log("updateUserProfile.fulfilled>>>>>>> ",action.payload)
        state.currentData = action.payload.user;
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(updateUserProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error.message)
      })
    // followUser
      .addCase(followUser.fulfilled, (state, action) => {
        // state.currentData = action.payload.user;
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(followUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error.message)
      })
    // unfollowUser
      .addCase(unfollowUser.fulfilled, (state, action) => {
        // state.currentData = action.payload.user;
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(unfollowUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error.message)
      })

  },
});
export const userReducer = userSlice.reducer;
