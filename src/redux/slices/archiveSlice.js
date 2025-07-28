// store/archiveSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], 
};

const archiveSlice = createSlice({
  name: "archive",
  initialState,
  reducers: {
    setArchiveItems: (state, action) => {
      state.items = action.payload;
    },
    deleteArchiveItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addArchiveItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { setArchiveItems, deleteArchiveItem, addArchiveItem } =
  archiveSlice.actions;

export default archiveSlice.reducer;
