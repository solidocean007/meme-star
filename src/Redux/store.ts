// src/Redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import memeSlice from "./memeSlice";
import authSlice from "./authSlice";
import snackBarSlice from "./snackBarSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    memes: memeSlice,
    auth: authSlice,
    snackbar: snackBarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
