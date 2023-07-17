import { RootState } from './store';
import { iSickChild } from '../interfaces/iSickList';

export const getSickListByQueryFromCachedListAction = (query: string) => {
  return async (dispatch: any, getState: any) => {
    const state = getState() as RootState;
    const cachedSickList = state.sickReducer.sickCache.find((sickCache) => sickCache.query === query);
    if (cachedSickList) {
      return cachedSickList.sickList as iSickChild[];
    }
  };
};
export const getRecommendQueryAction = () => {
  return async (dispatch: any, getState: any) => {
    const state = getState() as RootState;
    const sickCache = state.sickReducer.sickCache;
    const sickList = sickCache.filter(
      (sick) => sick.query.length >= 2 && sick.sickList.length < 3 && sick.sickList.length > 0,
    );
    const recommendQuery = sickList.map((sick) => sick.query);
    return recommendQuery.splice(0, 5) as string[];
  };
};
