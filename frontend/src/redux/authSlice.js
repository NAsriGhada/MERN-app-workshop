import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('token'))
console.log('this is the ', user)
console.log(localStorage.getItem("token"));

// Register / sign up new user
export const register = createAsyncThunk(
  "auth/register",
  async (userData) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/",
          userData
        );

        if (response.data) {
          const register = localStorage.setItem(
            "token",
            JSON.stringify(response.data)
          );
          console.log('this is registration from redux', register);
        }

        return response.data;
    } catch (error) {
      
      return console.log(error);
    }
  }
);

// Login / sign in a user
export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/login",
      userData
    );

    if (response.data) {
      const login = localStorage.setItem(
        "token",
        JSON.stringify(response.data)
      );
      console.log(login);
    }

    return response.data;
  } catch (error) {
    console.log(error)
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const logout = () => {
      localStorage.removeItem("token");
    };
  } catch (error) {
    console.log(error);
  }
});
// Logout user


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
