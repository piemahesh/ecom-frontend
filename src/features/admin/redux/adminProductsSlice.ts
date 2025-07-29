import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addAdminProduct,
  deleteAdminProduct,
  fetchAdminProducts,
  updateAdminProduct,
} from "../services/dashboardService";

export type adminProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: File | FileList | string;
  stock?: number;
  category: number | { id: number; name?: string };
};

interface AdminProductsState {
  items: adminProduct[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminProductsState = {
  items: [],
  isLoading: false,
  error: null,
};

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAdminProducts.fulfilled,
        (state, action: PayloadAction<adminProduct[]>) => {
          state.isLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(
        fetchAdminProducts.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(
        deleteAdminProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter((p) => p.id !== action.payload);
        }
      )
      .addCase(
        updateAdminProduct.fulfilled,
        (state, action: PayloadAction<adminProduct>) => {
          const idx = state.items.findIndex((p) => p.id === action.payload.id);
          if (idx !== -1) state.items[idx] = action.payload;
        }
      )
      .addCase(
        addAdminProduct.fulfilled,
        (state, action: PayloadAction<adminProduct>) => {
          state.items.push(action.payload);
        }
      );
  },
});

export default adminProductsSlice.reducer;
