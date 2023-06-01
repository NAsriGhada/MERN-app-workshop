import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create new post
export const createPosts = createAsyncThunk(
  "posts/create",
  async (postData, user) => {
    try {
      const token = user.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config);
      const response = await axios.post(
        "http://localhost:8080/api/posts/",
        postData,
        config
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

// Get user posts
export const getPosts = createAsyncThunk("posts/getAll", async (user) => {
  const token = user.getState().auth.user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("http://localhost:8080/api/posts/", config);
  console.log(response.data);
  return response.data;
});

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    reset: (state) => state.initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
