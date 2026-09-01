import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "../../services/userService";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserProfile();

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || "Errore nel caricamento del profilo";
      return rejectWithValue(message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    isAuthenticated: null,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      ((state.profile = null),
        (state.isAuthenticated = null),
        (state.error = null),
        localStorage.removeItem("token"));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.profile = null;
        state.isAuthenticated = false;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload; // Ora action.payload contiene l'oggetto utente corretto!
        state.loading = false;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
