import { localStorageQueryListName } from '../utils/sickUtility';

export interface ILocalRecentQueryRepository {
  save(value: string): void;
  get(): string | null;
}

export class LocalRecentQueryRepository implements ILocalRecentQueryRepository {
  private readonly keyName = localStorageQueryListName;
  save(value: string): void {
    localStorage.setItem(this.keyName, value);
  }

  get(): string | null {
    return localStorage.getItem(this.keyName);
  }
}
