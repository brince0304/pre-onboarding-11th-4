import { getDefaultExpireTime, localStorageSickCacheName } from '../utils/sickUtility';
import { iSickChild, ISickList } from '../interfaces/iSickList';

export interface ILocalStorageSickCacheRepository {
  getCachedData(query: string): ISickList | undefined;
  clearCachedData(): void;
  addToCachedData(query: string, sickList: iSickChild[]): void;
}

export class LocalStorageSickCacheRepository implements ILocalStorageSickCacheRepository {
  private readonly keyName = localStorageSickCacheName;
  private cachedData: ISickCache[];

  constructor() {
    this.cachedData = this.getFromLocalStorage();
  }

  private getFromLocalStorage(): ISickCache[] {
    const list = localStorage.getItem(this.keyName);
    return list ? JSON.parse(list) : [];
  }

  private updateLocalStorage(): void {
    localStorage.setItem(this.keyName, JSON.stringify(this.cachedData));
  }

  getCachedData(query: string): iSickChild[] | undefined {
    this.clearCachedData();
    const cachedItem = this.cachedData.find((item) => item.query === query);
    return cachedItem?.sickList;
  }

  clearCachedData(): void {
    this.cachedData = this.cachedData.filter((item) => item.expireTime > Date.now());
    this.updateLocalStorage();
  }

  addToCachedData(query: string, sickList: iSickChild[]): void {
    const newCache = {
      query,
      sickList,
      expireTime: getDefaultExpireTime(),
    };
    this.cachedData.push(newCache);
    this.updateLocalStorage();
  }
}
export interface ISickCache {
  query: string;
  sickList: ISickList;
  expireTime: number;
}
