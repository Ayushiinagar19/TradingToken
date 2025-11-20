import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import authReducer from './authSlice'; // <--- Import this

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    auth: authReducer, // <--- Add this line
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;