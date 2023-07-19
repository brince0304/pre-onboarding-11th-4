import { localStorageQueryListName } from '../utils/sickUtility';

export interface ILocalRecentQueryRepository {
  getFromLocalStorage(): string[];
  addRecentQuery(query: string): void;
  deleteRecentQuery(query: string): void;
}

export class LocalRecentQueryRepository implements ILocalRecentQueryRepository {
  private readonly keyName = localStorageQueryListName;

  getFromLocalStorage(): string[] {
    const list = localStorage.getItem(this.keyName);
    return list ? JSON.parse(list) : [];
  }

  addRecentQuery = (query: string) => {
    const queryList = this.getFromLocalStorage();
    if (queryList.indexOf(query) === -1) {
      queryList.unshift(query);
      const spliced = queryList.splice(0, 5);
      this.saveList(spliced);
    }
  };

  saveList(list: string[]): void {
    localStorage.setItem(this.keyName, JSON.stringify(list));
  }

  deleteRecentQuery = (query: string) => {
    const queryList = this.getFromLocalStorage();
    const index = queryList.indexOf(query);
    if (index !== -1) {
      queryList.splice(index, 1);
      this.saveList(queryList);
    }
  };
}
