import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { addComment, createPost, getAllPosts, getAllPostsByUser, likePost } from "./api_action";

const postSlice = createSlice({
  name: "userSlice",
  initialState: {
    posts: null,
    loading: false,
    error: null,
    message:null,
    currentPost: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // getAllPostsByUser
      .addCase(getAllPostsByUser.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(getAllPostsByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPostsByUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error)
      })

    // getAllPosts
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(getAllPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error)
      })

    // addComment
      .addCase(addComment.fulfilled, (state, action) => {
        // state.posts = action.payload;
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(addComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        toast.error(state.error)
      })
    // likePost
      .addCase(likePost.fulfilled, (state, action) => {
        // state.posts = action.payload;
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(likePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(likePost.rejected, (state, action) => {
        // state.error = action.payload;
        state.loading = false;
        toast.error(action.payload.message)
      })
    // createPost
      .addCase(createPost.fulfilled, (state, action) => {
        // state.posts = action.payload;
        state.loading = false;
        toast.success(action.payload.message)
      })
      .addCase(createPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message)
      })


  },
});
export const postReducer = postSlice.reducer;
