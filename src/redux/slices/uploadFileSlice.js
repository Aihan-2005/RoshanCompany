import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const uploadFile = createAsyncThunk(
  "uploadFile/uploadFile",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("media_files", file);

      const res = await fetch("https://harf.roshan-ai.ir/api/transcribe_files/", {
        method: "POST",
        headers: {
          Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.text) {
        return rejectWithValue("API response invalid");
      }

      return {
        text: data.text,
        name: file.name,
        format: file.type?.split("/")[1] || "mp3",
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  transcription: null,
  fileInfo: null,
};

const uploadFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    clearUploadState: (state) => {
      state.loading = false;
      state.error = null;
      state.transcription = null;
      state.fileInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.transcription = null;
        state.fileInfo = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.transcription = {
          simple: action.payload.text,
          timed: [], // اگر داری تایمینگ اضافه می‌کنی اینجا بذار
        };
        state.fileInfo = {
          name: action.payload.name,
          format: action.payload.format,
          date: new Date().toLocaleDateString("fa-IR"),
          duration: "00:12",
          type: "voice",
        };
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "خطای نامشخص در آپلود فایل";
      });
  },
});

export const { clearUploadState } = uploadFileSlice.actions;

export default uploadFileSlice.reducer;
