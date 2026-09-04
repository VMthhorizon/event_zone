import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig";

export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order/me");
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Impossibile recuperare lo storico degli ordini.";
      return rejectWithValue(message);
    }
  },
);

const initialState = {
  ordersList: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersList = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const orderReducer = orderSlice.reducer;
