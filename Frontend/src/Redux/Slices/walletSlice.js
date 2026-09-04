import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig";

export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/wallet/me");

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Non è stato possibile recuperare il wallet";

      return rejectWithValue(message);
    }
  },
);

export const fetchChargeWallet = createAsyncThunk(
  "wallet/fetchChargeWallet",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await api.patch("/wallet/me/charge", {
        balance: amount,
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Non è stato possibile ricaricare il wallet";

      return rejectWithValue(message);
    }
  },
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchChargeWallet.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const walletReducer = walletSlice.reducer;
