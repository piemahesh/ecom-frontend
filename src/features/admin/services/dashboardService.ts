import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services";
import { adminProduct } from "../redux/adminProductsSlice";


export interface DashboardStats {
  total_revenue: number;
  pending_orders: number;
  total_orders: number;
  total_products: number;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await API.get("/orders/merchant/dashboard-stats/");
  return response.data;
};

export const fetchCategories = async () => {
  const response = await API.get("products/categories/");
  return response.data;
};

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
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("products/my-products/");
      return response.data as adminProduct[];
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
  async (product: adminProduct, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());

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

      return response.data as adminProduct;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

export const addAdminProduct = createAsyncThunk(
  "adminProducts/addAdminProduct",
  async (product: Partial<adminProduct>, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", product.title || "");
      formData.append("description", product.description || "");
      formData.append("price", product.price?.toString() || "0");

      if (
        typeof product.category === "string" ||
        typeof product.category === "number"
      ) {
        formData.append("category", product.category.toString());
      } else if (typeof product.category === "object" && product.category.id) {
        formData.append("category", product.category.id.toString());
      }

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

      return response.data as adminProduct;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Add failed");
    }
  }
);
