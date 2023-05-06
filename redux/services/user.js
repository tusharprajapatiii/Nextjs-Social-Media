import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../lib/utils";
const initialState = {
  searchUsers: null,
  isLoading: false,
  isError: false,
  message: "",
  isSuccess: false,
};

export const searchUseraa = createAsyncThunk(
  "user/searchUseraa",
  async (searchValue, thunkAPI) => {
    try {
      const res = await axios.get(`/api/users/search?username=${searchValue}`);
      console.log(searchValue, res);
      return res.data;
    } catch (error) {
      const message = error.response.data.message;
      console.log(error, message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
    setUsersEmpty: (state) => {
      state.searchUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUseraa.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchUseraa.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.searchUsers = action.payload.users;
      })
      .addCase(searchUseraa.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset, setUsersEmpty } = userSlice.actions;
export default userSlice.reducer;
