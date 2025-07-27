// redux/transcriptionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "simple",
};

const transcriptionSlice = createSlice({
  name: "transcription",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = transcriptionSlice.actions;
export default transcriptionSlice.reducer;
