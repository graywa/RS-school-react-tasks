import { configureStore } from '@reduxjs/toolkit';
import characters from './charactersSlice';
import users from './usersSlice';

export const store = configureStore({
  reducer: {
    characters,
    users,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
