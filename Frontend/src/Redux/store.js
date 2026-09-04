import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slices/userSlice";
import { eventsReducer } from "./Slices/eventSlice";
import { cartReducer } from "./Slices/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    cart: cartReducer,
  },
});
