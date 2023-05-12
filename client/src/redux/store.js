import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import songReducer from "./songSlice";
import playerReducer from './features/playerSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
    player: playerReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});