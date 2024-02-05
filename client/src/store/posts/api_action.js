import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../client";

export const getAllPostsByUser = createAsyncThunk(
  "getAllPostsByUser",
  async ({ id }, thunkApi) => {
    try {
      const response = await client({
        url: `/user/${id}/posts`,
        method: "GET",
        //   data: {email, password, name, username},
      });
      console.log("getAllPostsByUser>>", response.data);
      return response.data;
      // return thunkApi.dispatch(LoginAPI({email,password}));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getPostById = createAsyncThunk(
  "getPostById",
  async ({ id }, thunkApi) => {
    try {
      const response = await client({
        url: `/posts/${id}`,
        method: "GET",
        //   data: {email, password, name, username},
      });
      console.log("getAllPostsByUser>>", response.data);
      return response.data;
      // return thunkApi.dispatch(LoginAPI({email,password}));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getAllPosts = createAsyncThunk(
  "getAllPosts",
  async (_, thunkApi) => {
    try {
      const response = await client({
        url: `/posts`,
        method: "GET",
      });
      console.log("getAllPostsByUser>>", response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getPostsFromFollowing = createAsyncThunk(
  "getPostsFromFollowing",
  async (_, thunkApi) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const response = await client({
        url: `/following/posts`,
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      
      console.log("getPostsFromFollowing>>", response.data);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "addComment",
  async ({ text, username, id }, thunkApi) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const response = await client({
        url: `/posts/${id}/comments`,
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: { text, username },
      });
      
      console.log("addComment>>", response.data);
      thunkApi.dispatch(getPostById({id}));

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const likePost = createAsyncThunk(
  "likePost",
  async ({ username, id }, thunkApi) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const response = await client({
        url: `/posts/${id}/like`,
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: { username },
      });
      
      console.log("likePost>>", response.data);
      thunkApi.dispatch(getPostById({id}));
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const unLikePost = createAsyncThunk(
  "unLikePost",
  async ({ username, id }, thunkApi) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const response = await client({
        url: `/posts/${id}/unlike`,
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: { username },
      });
      
      console.log("likePost>>", response.data);
      thunkApi.dispatch(getPostById({id}));
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const createPost = createAsyncThunk(
  "createPost",
  async ({ imageURL, caption }, thunkApi) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const response = await client({
        url: `/posts`,
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: { imageURL, caption },
      });
      
      console.log("createPost>>", response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
