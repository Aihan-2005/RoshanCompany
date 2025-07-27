import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  src: "",
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setSrc(state, action) {
      state.src = action.payload;
      // reset status on new src
      state.isPlaying = false;
      state.currentTime = 0;
      state.duration = 0;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    resetAudio(state) {
      state.src = "";
      state.isPlaying = false;
      state.currentTime = 0;
      state.duration = 0;
      state.volume = 1;
    },
  },
});

export const {
  setSrc,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  resetAudio,
} = audioSlice.actions;

export default audioSlice.reducer;
