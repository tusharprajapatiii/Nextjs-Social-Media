import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { server } from "../../lib/utils";
import axios from "axios";
const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  isSuccess: false,
  feedPosts: [],
};
// export const createPost = createAsyncThunk(
//   "posts/createPost",
//   async (postItems, thunkAPI) => {
//     try {
//       const res = await axios.post(`${server}/api/posts`, postItems, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return res.data;
//     } catch (error) {
//       const message = error.response.data.message;
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
export const getFeedPosts = createAsyncThunk(
  "posts/getFeedPosts",
  async (token, thunkAPI) => {
    try {
      const res = await axios.get(`${server}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postItems, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.post(`${server}/api/posts`, postItems, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, content }, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/posts/${id}`, { content });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/posts/${id}/like`);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async (id, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/posts/${id}/unlike`);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.delete(`${server}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(likePost.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(unlikePost.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFeedPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFeedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedPosts = action.payload.posts;
      })
      .addCase(getFeedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = postsSlice.actions;
export default postsSlice.reducer;