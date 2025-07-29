// src/features/dashboard/dashboardSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DashboardStats, fetchDashboardStats } from "./services/dashboardService";


interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

// Single service call used inside Redux
export const fetchDashboardStatsThunk = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, thunkAPI) => {
    try {
      const data = await fetchDashboardStats();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
