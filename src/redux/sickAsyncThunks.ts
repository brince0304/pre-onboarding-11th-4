import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISickList } from '../interfaces/iSickList';

export const getSickListByQueryThunk = createAsyncThunk(
  'sick/getSickListByQuery',
  async (getSickListByQuery: () => Promise<ISickList>) => {
    return await getSickListByQuery();
  },
);
