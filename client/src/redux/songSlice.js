import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.currentSong = action.payload;
    },
    like: (state, action) => {
      if (!state.currentSong.likes.includes(action.payload)) {
        state.currentSong.likes.push(action.payload);
        state.currentSong.dislikes.splice(
          state.currentSong.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentSong.dislikes.includes(action.payload)) {
        state.currentSong.dislikes.push(action.payload);
        state.currentSong.likes.splice(
          state.currentSong.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const { fetchSuccess, like, dislike } =
  songSlice.actions;

export default songSlice.reducer;
