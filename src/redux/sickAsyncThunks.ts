import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISickList } from '../interfaces/iSickList';
import { RootState } from './store';

export const getSickListByQueryThunk = createAsyncThunk(
  'sick/getSickListByQuery',
  async (arg: { getSickListByQuery: (query: string) => Promise<ISickList>; query: string },{dispatch}) => {
    const cachedList = dispatch(getSickListByQueryFromCacheThunk({ query: arg.query }));
    if(cachedList) {
      return cachedList
    }
    return await arg.getSickListByQuery(arg.query);
  },
  {
  }
);

export const getSickListByQueryFromCacheThunk = createAsyncThunk(
  'sick/getSickListByQueryFromCache',
  async (arg: { query: string },{getState}) => {
    const state = getState() as RootState;
    const cachedList = state.sickReducer.sickCache.find((sickCache) => sickCache.query === arg.query);
    if(cachedList) {
      return cachedList.sickList as ISickList;
    }
  }
);


