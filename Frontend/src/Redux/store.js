import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slices/userSlice";
import { eventsReducer } from "./Slices/eventSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
  },
});
