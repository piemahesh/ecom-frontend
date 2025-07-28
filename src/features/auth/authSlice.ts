import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, SignUpUser, User } from '../../types';
import { API } from '../../services';

// Mock API calls
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const { data } = await API.post("users/login/", { username, password });
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("access",data.access)
      localStorage.setItem("refresh",data.refresh)
      return data;  
    } catch (error) {
      return error
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (data: SignUpUser) => {
    // Simulate API call
    try {
      const response = await API.post("users/register/", { ...data });
      console.log(response.data);
      return response.data
    } catch (error) {
      return error;
    }

  }
);

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    return JSON.parse(userData) as User;
  }
  throw new Error('No user found');
});

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      // Add error handling if needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;