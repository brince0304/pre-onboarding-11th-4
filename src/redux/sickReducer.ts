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
  error: null,
};

const sickSlice = createSlice({
  name: 'sick',
  initialState,
  reducers: {
    setCachedSickList: (state, action) => {
      state.sickCache.push(action.payload);
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
      console.info('api call pending');
      state.error = null;
      state.sickCache = state.sickCache.filter((sickCache) => sickCache.expireTime > Date.now());
    });
    builder.addCase(getSickListByQueryThunk.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.error = null;
      const expireTime = getDefaultExpireTime();
      if (state.sickCache.findIndex((sickCache) => sickCache.query === action.meta.arg.query) === -1) {
        const sickCache = {
          query: action.meta.arg.query,
          sickList: action.payload ? action.payload.splice(0, 7) : [],
          expireTime,
        } as ISickCache;
        state.sickCache.push(sickCache);
      }
    });
    builder.addCase(getSickListByQueryThunk.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || null;
    });
  },
});

export default sickSlice.reducer;
export const { setCachedSickList, setError, setLoading } = sickSlice.actions;
