"use client";
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import persistTokenMiddleware from './middleware/persistTokenMiddleware';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistTokenMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
