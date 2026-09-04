import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllEvents } from "../../services/eventService";

export const fetchAllEvents = createAsyncThunk(
  "event/fetchAllEvents",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await getAllEvents(filters);
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
    searchTerm: "",
    selectedCategory: "tutti",
    maxPrice: 300,
    selectedDate: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    resetSideFilters: (state) => {
      state.maxPrice = 300;
      state.selectedDate = "";
    },
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

export const {
  setSearchTerm,
  setSelectedCategory,
  setMaxPrice,
  setSelectedDate,
  resetSideFilters,
} = eventsSlice.actions;

export const eventsReducer = eventsSlice.reducer;
