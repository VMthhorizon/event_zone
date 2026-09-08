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

// Ricavo la chiave specifica dell'utente
const getCartKey = (userId) => (userId ? `cartItems_${userId}` : null);

const saveCartToStorage = (userId, cartItems) => {
  const key = getCartKey(userId);
  if (!key) return;
  try {
    localStorage.setItem(key, JSON.stringify(cartItems));
  } catch (error) {
    console.error(
      "Errore nel salvataggio del carrello in localStorage:",
      error,
    );
  }
};

const initialState = {
  cartItems: [],
  currentUserId: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Carica il carrello specifico per l'utente loggato
    loadUserCart: (state, action) => {
      const userId = action.payload;
      state.currentUserId = userId;

      if (!userId) {
        state.cartItems = [];
        return;
      }

      const key = getCartKey(userId);
      try {
        const saved = localStorage.getItem(key);
        state.cartItems = saved ? JSON.parse(saved) : [];
      } catch {
        state.cartItems = [];
      }
    },

    addToCart: (state, action) => {
      const { item: eventToAdd, userId } = action.payload;
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

      saveCartToStorage(userId || state.currentUserId, state.cartItems);
    },

    removeFromCart: (state, action) => {
      const { idToRemove, userId } = action.payload.idToRemove
        ? action.payload
        : { idToRemove: action.payload, userId: state.currentUserId };

      state.cartItems = state.cartItems.filter(
        (item) => (item.event.eventId || item.event.id) !== idToRemove,
      );

      saveCartToStorage(userId || state.currentUserId, state.cartItems);
    },

    clearCart: (state, action) => {
      const userId = action.payload || state.currentUserId;
      state.cartItems = [];
      const key = getCartKey(userId);
      if (key) {
        localStorage.removeItem(key);
      }
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
        const key = getCartKey(state.currentUserId);
        if (key) {
          localStorage.removeItem(key);
        }
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loadUserCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
