import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWallet } from "./walletSlice";
import api from "../../services/axiosConfig";
export const checkoutOrder = createAsyncThunk(
  "cart/checkoutOrder",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { cartItems } = getState().cart;

      const payload = {
        tickets: cartItems.map((item) => ({
          eventId: item.event.eventId || item.event.id,
          quantity: item.quantity,
        })),
      };

      const response = await api.post("/order/checkout", payload);

      dispatch(fetchWallet());

      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Errore durante il completamento dell'ordine.";
      return rejectWithValue(message);
    }
  },
);

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error(
      "Errore nel salvataggio del carrello in localStorage:",
      error,
    );
  }
};

const initialState = {
  cartItems: loadCartFromStorage(),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const eventToAdd = action.payload;
      const targetId = eventToAdd.eventId || eventToAdd.id;

      const existingIndex = state.cartItems.findIndex(
        (item) => (item.event.eventId || item.event.id) === targetId,
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex].quantity += 1;
      } else {
        state.cartItems.push({
          event: {
            ...eventToAdd,
            eventId: targetId,
          },
          quantity: 1,
        });
      }

      saveCartToStorage(state.cartItems);
    },

    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => (item.event.eventId || item.event.id) !== idToRemove,
      );

      saveCartToStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkoutOrder.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
        localStorage.removeItem("cartItems");
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
