import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../lib/utils";
const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  firstLoad: false,
};

export const getConversations = createAsyncThunk(
  "messages/getConversation",
  async (page = 1, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const user = thunkAPI.getState().auth.user;

      const res = await axios.get(`/api/conversations?limit=${page * 9}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let newArr = [];
      res.data.conversations.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== user._id) {
            newArr.push({ ...cv, text: item.text });
          }
        });
      });
      return {
        newArr,
        result: res.data.result,
      };
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postMessage = createAsyncThunk(
  "messages/postMessage",
  async ({ message }, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      const token = thunkAPI.getState().auth.token;
      const { _id, avatar, username, fullname } = user;
      // socket.emit("getConversation", {
      //   ...message,
      //   user: { _id, avatar, username, fullname },
      // });
      const res = await axios.post(`/api/messages`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.newMessage;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async ({ id, page = 1 }, thunkAPI) => {
    try {
      const res = await axios.get(`/api/messages/${id}?limit=${page * 9}`);
      const newData = { ...res.data, messages: res.data.messages.reverse() };
      return {
        ...newData,
        _id: id,
        page,
      };
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loadMoreMessages = createAsyncThunk(
  "messages/loadMoreMessages",
  async ({ id, page = 1 }, thunkAPI) => {
    try {
      const res = axios.get(`/api/messages/${id}?limit=${page * 9}`);
      const newData = { ...res.data, messages: res.data.messages.reverse() };
      return {
        newData,
        _id: id,
        page,
      };
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async ({ message, data }, thunkAPI) => {
    try {
      const newData = data.filter((item) => item._id !== message._id);
      const token = thunkAPI.getState().auth.token;
      const res = await axios.delete(`/api/messages/${message._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        newData,
        _id: message.recipient,
        res: res.data,
      };
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteConversation = createAsyncThunk(
  "messages/deleteConversation",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.delete(`/api/conversations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        id,
        res: res.data,
      };
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addUser: (state, action) => {
      if (state.users.every((item) => item._id !== action.payload._id)) {
        state.users = [action.payload, ...state.users];
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postMessage.fulfilled, (state, action) => {
        state.data = state.data.map((item) =>
          item._id === action.payload.recipient ||
          item._id === action.payload.sender
            ? {
                ...item,
                messages: [...item.messages, action.payload],
                result: item.result + 1,
              }
            : item
        );
        state.users = state.users.map((user) =>
          user._id === action.payload.recipient ||
          user._id === action.payload.sender
            ? {
                ...user,
                text: action.payload.text,
              }
            : user
        );
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.users = action.payload.newArr;
        state.resultUsers = action.payload.result;
        state.firstLoad = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.data = state.data.map((item) =>
          item._id === action.payload._id
            ? { ...item, messages: action.payload.newData }
            : item
        );
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item._id !== action.payload.id
        );
        state.users = state.users.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(loadMoreMessages.fulfilled, (state, action) => {
        state.data = state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      });
  },
});
export const { addUser } = messagesSlice.actions;
export default messagesSlice.reducer;
