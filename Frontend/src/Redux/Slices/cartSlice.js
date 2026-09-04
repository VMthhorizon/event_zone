import { createSlice } from "@reduxjs/toolkit";

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
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
