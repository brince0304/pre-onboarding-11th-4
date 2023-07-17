import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISickList } from '../interfaces/iSickList';

export const getSickListByQueryThunk = createAsyncThunk(
  'sick/getSickListByQuery',
  async (arg: { getSickListByQuery: (query: string) => Promise<ISickList>; query: string }) => {
    return await arg.getSickListByQuery(arg.query);
  },
);
