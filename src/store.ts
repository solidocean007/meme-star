// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import postReducer from '../features/posts/postSlice';
import commentReducer from '../features/comments/commentSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
