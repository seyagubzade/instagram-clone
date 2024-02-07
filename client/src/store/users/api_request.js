import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../client";
import { LoginAPI } from "../auth/api_request";

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, thunkApi) => {
    try {
      const response = await client({
        url: "/users",
        method: "GET",
        //   data: {email, password, name, username},
      });
      console.log("RegisterAPI>>", response.data);
      return response.data;
      // return thunkApi.dispatch(LoginAPI({email,password}));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getUserById = createAsyncThunk(
  "getUserById",
  async ({ id }, thunkApi) => {
    const mainUserId = JSON.parse(localStorage.getItem("mainUser"))._id
    try {
      const response = await client({
        url: `/users/${id}`,
        method: "GET",
        //   data: {email, password, name, username},
      });
      if(response.data._id == mainUserId){
        localStorage.setItem("mainUser", JSON.stringify(response.data))
      }
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async ({ id }, thunkApi) => {
    try {
      const response = await client({
        url: `/users/${id}`,
        method: "DELETE",
        //   data: {email, password, name, username},
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const searchUserByUsername = createAsyncThunk(
  "searchUserByUsername",
  async ({ username }, thunkApi) => {
    try {
      const response = await client({
        url: `/users/search/${username}`,
        method: "GET",
        //   data: {email, password, name, username},
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async ({email, password, name, username, profileImg}, thunkApi) => {
    try {
      const token = JSON.parse(localStorage.getItem("authToken"))
      const response = await client({
        url: "/users/profile",
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {email, password, name, username, profileImg},
      });
      console.log("updateUserProfile response:", response.data);
      return response.data;
    // const {resEmail, resPassword}  = 
    //   return thunkApi.dispatch(LoginAPI(response.data.user._id));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const followUser = createAsyncThunk(
  "followUser",
  async ({userIdToFollow}, thunkApi) => {
    try {
      const token = JSON.parse(localStorage.getItem("authToken"))
      const id = JSON.parse(localStorage.getItem("mainUser"))._id
      const response = await client({
        url: "/users/follow",
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {userIdToFollow},
      });
      console.log("followUser response:", response.data);
      // thunkApi.dispatch(getUserById({id}))
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "unfollowUser",
  async ({userIdToUnfollow}, thunkApi) => {
    try {
      const token = JSON.parse(localStorage.getItem("authToken"))
      const id = JSON.parse(localStorage.getItem("mainUser"))._id
      const response = await client({
        url: "/users/unfollow",
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: {userIdToUnfollow},
      });
      console.log("userIdToUnfollow response:", response.data);
      // thunkApi.dispatch(getUserById({id}))
      return response.data;
    } catch (error) {
      console.log("unfollowUser API>>>>",error.response.data)
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
