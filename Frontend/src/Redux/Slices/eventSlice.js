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

    // Paginazione
    page: 0,
    size: 8,
    totalPages: 0,

    searchTerm: "",
    selectedCategory: "tutti",
    maxPrice: 300,
    selectedDate: "",
    sortDirection: "asc",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setResetPage: (state) => {
      state.page = 0;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.page = 0;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.page = 0;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
      state.page = 0;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      state.page = 0;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
    resetSideFilters: (state) => {
      state.maxPrice = 300;
      state.selectedDate = "";
      state.page = 0;
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
        state.eventsList = action.payload?.content || action.payload;

        // Estraggo sia "content" che "totalPages" per la paginazione
        if (action.payload && action.payload.content) {
          state.eventsList = action.payload.content;
          state.totalPages = action.payload.totalPages;
        } else {
          state.eventsList = action.payload || [];
          state.totalPages = 0;
        }
      });
  },
});

export const {
  setPage,
  setResetPage,
  setSearchTerm,
  setSelectedCategory,
  setMaxPrice,
  setSelectedDate,
  setSortDirection,
  resetSideFilters,
} = eventsSlice.actions;

export const eventsReducer = eventsSlice.reducer;
