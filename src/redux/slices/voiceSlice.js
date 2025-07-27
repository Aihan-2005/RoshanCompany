// src/redux/slices/voiceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRecording: false,
  audioURL: null,
  transcript: '',
  duration: '00:00',
  archive: JSON.parse(localStorage.getItem('archive') || '[]'),
};

const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {
    startRecording(state) {
      state.isRecording = true;
      state.transcript = '';
      state.audioURL = null;
      state.duration = '00:00';
    },
    stopRecording(state) {
      state.isRecording = false;
    },
    setAudioURL(state, action) {
      state.audioURL = action.payload;
    },
    setTranscript(state, action) {
      state.transcript = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    addToArchive(state, action) {
      state.archive.unshift(action.payload);
      localStorage.setItem('archive', JSON.stringify(state.archive));
    },
  },
});

export const {
  startRecording,
  stopRecording,
  setAudioURL,
  setTranscript,
  setDuration,
  addToArchive,
} = voiceSlice.actions;

export default voiceSlice.reducer;
