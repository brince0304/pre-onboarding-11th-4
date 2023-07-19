import { getDefaultExpireTime, localStorageSickCacheName } from '../utils/sickUtility';
import { iSickChild, ISickList } from '../interfaces/iSickList';

export interface ILocalStorageSickCacheRepository {
  getCachedData(query: string): ISickList | undefined;
  clearCachedData(): void;
  addToCachedData(query: string, sickList: iSickChild[]): void;
}

export class LocalStorageSickCacheRepository implements ILocalStorageSickCacheRepository {
  private readonly keyName = localStorageSickCacheName;

  getFromLocalStorage = () => {
    const list = localStorage.getItem(this.keyName);
    if (list) {
      return JSON.parse(list) as ISickCache[];
    }
    return [];
  };
  getCachedData = (query: string) => {
    this.clearCachedData();
    const cachedData = this.getFromLocalStorage();
    const cachedItem = cachedData.find((item: any) => item.query === query) as ISickCache;
    return cachedItem.sickList;
  };

  clearCachedData = () => {
    const cachedData = this.getFromLocalStorage();
    const filteredCachedData = cachedData.filter((item: any) => item.expireTime > Date.now());
    localStorage.setItem(this.keyName, JSON.stringify(filteredCachedData));
  };

  addToCachedData = (query: string, sickList: iSickChild[]) => {
    const cachedData = this.getFromLocalStorage();
    const newCachedData = [
      ...cachedData,
      {
        query,
        sickList,
        expireTime: getDefaultExpireTime(),
      },
    ];
    localStorage.setItem(this.keyName, JSON.stringify(newCachedData));
  };
}
export interface ISickCache {
  query: string;
  sickList: ISickList;
  expireTime: number;
}
