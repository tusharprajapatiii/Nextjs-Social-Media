import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../lib/utils";
const initialState = {
  loading: false,
  data: [],
};

export const createNotify = createAsyncThunk(
  "notify/createNotify",
  async ({ message }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.post(`${server}/api/notification`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getNotify = createAsyncThunk(
  "notify/getNotify",
  async (thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(`${server}/api/notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.notifies;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeNotify = createAsyncThunk(
  "notify/removeNotify",
  async ({ message }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.delete(
        `${server}/api/notification/${message.id}?${message.url}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const isReadNotify = createAsyncThunk(
  "notify/isReadNotify",
  async ({ message }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.patch(
        `${server}/api/notification/${message.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return {
        ...message,
        isRead: true,
      };
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteAllNotify = createAsyncThunk(
  "notify/deleteAllNotify",
  async (thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.delete(`${server}/api/notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return [];
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const notifySlice = createSlice({
  name: "notify",
  initialState,
  extraReducers: {
    [createNotify.fulfilled]: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
    [getNotify.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [removeNotify.fulfilled]: (state, action) => {
      state.data = state.data.filter(
        (notify) =>
          notify.id !== action.payload.id || notify.url !== action.payload.url
      );
    },
    [isReadNotify.fulfilled]: (state, action) => {
      state.data = state.data.map((notify) =>
        notify.id === action.payload.id ? action.payload : notify
      );
    },
    [deleteAllNotify.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default notifySlice.reducer;
