import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  Order,
  OrdersState,
  CartItem,
  ShippingAddress,
} from "../../types";

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({
    items,
    total,
    shippingAddress,
    paymentMethod,
  }: {
    items: CartItem[];
    total: number;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
  }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const order: Order = {
      id: Date.now().toString(),
      userId: "1", // Mock user ID
      items,
      total,
      status: "pending",
      shippingAddress,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage (mock database)
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    savedOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(savedOrders));

    return order;
  }
);

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  return savedOrders as Order[];
});

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["status"] }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
      if (state.currentOrder && state.currentOrder.id === action.payload.id) {
        state.currentOrder.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearCurrentOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
