import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../lib/utils";
import axios from "axios";
import { updateFollow, updateUsers } from "./auth";
const initialState = {
  searchUsers: [],
  isLoading: false,
  isError: false,
  message: "",
  isSuccess: false,
  searchBar: false,
  posts: [],
  users: [],
};
export const getSearchUsers = createAsyncThunk(
  "users/searchUsers",
  async (searchValue, thunkAPI) => {
    try {
      const res = await axios.get(
        `${server}/api/users/search?username=${searchValue}`
      );
      console.log(searchValue, res);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "users/getUser",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(`${server}/api/posts/userpost/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (data, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${server}/api/users`,
        data
        // {
        //   headers: {
        //     Authorization: `Bearer ${data.token}`,
        //   },
        // }
      );
      // const data = await res.data;
      thunkAPI.getState().auth.user = res.data.user;
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/auth/changepassword`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const followUser = createAsyncThunk(
  "users/followUser",
  async ({ users, user, id }, thunkAPI) => {
    try {
      const auth = thunkAPI.getState().auth;
      let newUser;

      if (users.every((item) => item._id !== user._id)) {
        newUser = { ...user, followers: [...user.followers, auth.user] };
      } else {
        users.forEach((item) => {
          if (item._id === user._id) {
            newUser = { ...item, followers: [...item.followers, auth.user] };
          }
        });
      }
      await axios.patch(`${server}/api/users/${id}/follow`);
      await thunkAPI.dispatch(updateFollow(newUser));

      // thunkAPI.getState().auth.user = {
      //   ...auth.user,
      //   following: [...auth.user.following, newUser],
      // };

      return {
        ...newUser,
      };
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "users/unFollowUser",
  async ({ users, user, id }, thunkAPI) => {
    try {
      const auth = thunkAPI.getState().auth;
      let newUser;

      if (users.every((item) => item._id !== user._id)) {
        newUser = {
          ...user,
          followers: user.followers.filter((item) => item._id !== user._id),
        };
      } else {
        users.forEach((item) => {
          if (item._id === user._id) {
            newUser = {
              ...item,
              followers: item.followers.filter(
                (item) => item._id !== auth.user._id
              ),
            };
          }
        });
      }
      await axios.patch(`${server}/api/users/${id}/unfollow`);
      await thunkAPI.dispatch(updateUsers(newUser));
      // thunkAPI.getState().auth.user = {
      //   ...auth.user,
      //   following: auth.user.following.filter(
      //     (item) => item._id !== newUser._id
      //   ),
      // };
      return {
        ...newUser,
      };
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteMe = createAsyncThunk("users/deleteMe", async (thunkAPI) => {
  try {
    const res = await axios.delete(`${server}/api/users/deleteme`);
    return res.data;
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});
export const giveStar = createAsyncThunk(
  "users/giveStar",
  async (id, thunkAPI) => {
    try {
      const res = await axios.patch(`${server}/api/users/${id}/givestar`);
      return res.data;
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
    setSearchBar: (state, { payload }) => {
      state.searchBar = payload;
    },
    getUser: (state, { payload }) => {
      const usersArray = [...state.users, payload];
      state.users = [...new Set(usersArray)];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.searchUsers = action.payload.users;
      })
      .addCase(getSearchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(giveStar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(giveStar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(giveStar.rejected, (state, action) => {
        // eslint-disable-line
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(followUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unFollowUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(unFollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload.posts;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        getStoredState;
      });
  },
});
export const { reset, setSearchBar, getUser } = userSlice.actions;
export default userSlice.reducer;
