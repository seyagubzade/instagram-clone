import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../client";

export const LoginAPI = createAsyncThunk(
  "LoginAPI",
  async (config, thunkApi) => {
    try {
      const response = await client({
        url: "/login",
        method: "POST",
        data: config,
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data)
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const RegisterAPI = createAsyncThunk(
  "RegisterAPI",
  async ({email, password, name, username}, thunkApi) => {
    try {
      const response = await client({
        url: "/register",
        method: "POST",
        data: {email, password, name, username},
      });
      console.log("RegisterAPI>>",response.data)
      // return response.data;
      return thunkApi.dispatch(LoginAPI({email,password}));
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
