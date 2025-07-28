// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import transcriptionReducer from "./slices/transcriptionSlice";
import audioSlice from "./slices/audioSlice";
import voiceReducer from './slices/voiceSlice';
import archiveReducer from './slices/archiveSlice';
import uploadFileSlice from './slices/uploadFileSlice';

const store = configureStore({
  reducer: {
    transcription: transcriptionReducer,
     audio: audioSlice,
    voice: voiceReducer,
     archive: archiveReducer,
     upload:uploadFileSlice,
  },
});

export default store;
