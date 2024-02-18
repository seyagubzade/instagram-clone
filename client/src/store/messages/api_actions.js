import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../client";

export const getMessages = createAsyncThunk(
  "getMessages",
  async ({recipientId}, thunkApi) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const response = await client({
        url: `/messages/${recipientId}`,
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const sendMessage = createAsyncThunk(
  "sendMessage",
  async ({message, recipientId}, thunkApi) => {
    const token = JSON.parse(localStorage.getItem("authToken"));
    try {
      const response = await client({
        url: `/messages/send`,
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: { message, recipientId },
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
