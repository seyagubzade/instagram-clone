import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../client";

export const getNotifications = createAsyncThunk(
  "getNotifications",
  async (_, thunkApi) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const response = await client({
        url: `/notifications`,
        method: "GET",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
      });
      console.log("getAllPostsByUser>>", response.data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
