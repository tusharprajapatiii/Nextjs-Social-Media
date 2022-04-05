import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../lib/utils";
import axios from "axios";
const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  isSuccess: false,
};
export const createComment = createAsyncThunk(
  "comments/createComment",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${server}/api/comment`, data);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (data, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/comment/${data.id}`, data);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${server}/api/comment/${id}`);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async (id, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/comment/${id}/like`);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unlikeComment = createAsyncThunk(
  "comments/unlikeComment",
  async (id, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/comment/${id}/unlike`);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(updateComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(deleteComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(likeComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(likeComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(likeComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(unlikeComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(unlikeComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(unlikeComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});
