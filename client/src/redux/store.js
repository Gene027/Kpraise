import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import playerReducer from './features/playerSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});