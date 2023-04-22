import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import playerReducer from './features/playerSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer
  }
});