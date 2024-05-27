// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../features/users/userSlice';
// import postReducer from '../features/posts/postSlice';
// import commentReducer from '../features/comments/commentSlice';
import memeSlice from './memeSlice';

export const store = configureStore({
  reducer: {
    memes: memeSlice,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
