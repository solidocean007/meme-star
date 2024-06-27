// src/Redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import memeSlice from "./memeSlice";
import authSlice from "./authSlice";
import snackBarSlice from "./snackBarSlice";

export const store = configureStore({
  reducer: {
    memes: memeSlice,
    auth: authSlice,
    snackbar: snackBarSlice,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
