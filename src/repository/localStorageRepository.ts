export interface ILocalRecentQueryRepository {
    save(value: string): void;
    get(): string | null;
}

export class LocalRecentQueryRepository implements ILocalRecentQueryRepository {
  // @ts-ignore
  #keyName: string;
  constructor(keyName: string) {
    this.#keyName = keyName;
  }
    save(value: string): void {
        localStorage.setItem(this.#keyName,value);
    }

    get(): string | null {
        return localStorage.getItem(this.#keyName);
    }
}