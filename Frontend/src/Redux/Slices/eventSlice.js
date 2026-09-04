import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEvents } from "../../services/eventService";

export const fetchAllEvents = createAsyncThunk(
  "event/fetchAllEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllEvents();

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || "Errore nel caricamento degli eventi";
      return rejectWithValue(message);
    }
  },
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    eventsList: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.eventsList = [];
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.eventsList = action.payload;
      });
  },
});

export const eventsReducer = eventsSlice.reducer;
