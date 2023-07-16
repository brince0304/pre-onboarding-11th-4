import { RootState } from './store';
import { iSickChild } from '../interfaces/iSickList';

export const getSickListByQueryFromCachedList = (query:string) => {
  return async (dispatch: any, getState: any) => {
    const state = getState() as RootState;
    const cachedList = state.sickReducer.sickCache.find((sickCache) => sickCache.query === query);
    if (cachedList) {
      return cachedList.sickList as iSickChild[];
  }
  };
};
