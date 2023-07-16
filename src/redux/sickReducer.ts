import { ISickList } from '../interfaces/iSickList';
import { createSlice } from '@reduxjs/toolkit';
import { getSickListByQueryThunk } from './sickAsyncThunks';
import { getDefaultExpireTime } from '../utils/sickUtility';

interface ISickCache {
  query: string;
  sickList: ISickList;
  expireTime: number;
}

interface ISickReducer {
  sickCache: ISickCache[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ISickReducer = {
  sickCache: [],
  loading: 'idle',
  error: null
}

const sickSlice = createSlice({
  name: 'sick',
  initialState,
  reducers: {
    setCachedSickList: (state, action) => {
      state.sickCache.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSickListByQueryThunk.pending, (state, action) => {
      state.loading = 'pending';
      state.error = null;
      state.sickCache = state.sickCache.filter((sickCache) => sickCache.expireTime > Date.now());
    });
    builder.addCase(getSickListByQueryThunk.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.error = null;
      const expireTime = getDefaultExpireTime();
      const sickCache = {
        query: action.meta.arg.query,
        sickList: action.payload,
        expireTime
      } as ISickCache;
      if(state.sickCache.findIndex((sickCache) => sickCache.query === action.meta.arg.query) > -1) {
        state.sickCache.push(sickCache);
      }
    });
    builder.addCase(getSickListByQueryThunk.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || null;
    });
  }
});

export default sickSlice.reducer;
export const { setCachedSickList } = sickSlice.actions;
