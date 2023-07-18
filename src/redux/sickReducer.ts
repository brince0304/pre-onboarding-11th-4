import { iSickChild } from '../interfaces/iSickList';
import { createSlice } from '@reduxjs/toolkit';
import { getSickListByQueryThunk } from './sickAsyncThunks';

interface ISickReducer {
  sickList: iSickChild[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ISickReducer = {
  sickList: [],
  loading: 'idle',
  error: null,
};

const sickSlice = createSlice({
  name: 'sick',
  initialState,
  reducers: {
    setSickList: (state, action) => {
      state.sickList = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      if (state.loading === 'pending') {
        return;
      }
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSickListByQueryThunk.pending, (state, action) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(getSickListByQueryThunk.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.sickList = action.payload;
      state.error = null;
    });
    builder.addCase(getSickListByQueryThunk.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || null;
    });
  },
});

export default sickSlice.reducer;
export const { setSickList, setError, setLoading } = sickSlice.actions;
