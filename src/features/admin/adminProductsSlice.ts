// src/features/admin/adminProductsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../../services";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: File | FileList | string;
  stock?: number;
  category: number | { id: number; name?: string };
};

interface AdminProductsState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminProductsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("products/my-products/");
      return response.data as Product[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to fetch");
    }
  }
);

export const deleteAdminProduct = createAsyncThunk(
  "adminProducts/deleteAdminProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await API.delete(`/products/${id}/`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }
  }
);

export const updateAdminProduct = createAsyncThunk(
  "adminProducts/updateAdminProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      // ✅ FIX category (ensure it's an ID string)
      formData.append(
        "category",
        (product.category as any)?.id?.toString() || String(product.category)
      );

      if (product.image instanceof FileList && product.image.length > 0) {
        formData.append("image", product.image[0]);
      } else if (product.image instanceof File) {
        formData.append("image", product.image);
      }

      if (product.stock !== undefined)
        formData.append("stock", product.stock.toString());

      const response = await API.put(`/products/${product.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data as Product;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

export const addAdminProduct = createAsyncThunk(
  "adminProducts/addAdminProduct",
  async (product: Partial<Product>, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", product.title || "");
      formData.append("description", product.description || "");
      formData.append("price", product.price?.toString() || "0");

      // ✅ FIX category (ensure it's an ID string)
      if (
        typeof product.category === "string" ||
        typeof product.category === "number"
      ) {
        formData.append("category", product.category.toString());
      } else if (typeof product.category === "object" && product.category.id) {
        formData.append("category", product.category.id.toString());
      }

      // ✅ FIX image (extract the file from FileList)
      if (product.image instanceof FileList && product.image.length > 0) {
        formData.append("image", product.image[0]);
      } else if (product.image instanceof File) {
        formData.append("image", product.image);
      }

      if (product.stock !== undefined) {
        formData.append("stock", product.stock.toString());
      }

      const response = await API.post("/products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data as Product;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Add failed");
    }
  }
);

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
        (state, action: PayloadAction<Product[]>) => {
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
        (state, action: PayloadAction<Product>) => {
          const idx = state.items.findIndex((p) => p.id === action.payload.id);
          if (idx !== -1) state.items[idx] = action.payload;
        }
      )
      .addCase(
        addAdminProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.items.push(action.payload);
        }
      );
  },
});

export default adminProductsSlice.reducer;
