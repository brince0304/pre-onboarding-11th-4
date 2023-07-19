import { iSickChild, ISickList } from '../interfaces/iSickList';
import { AxiosInstance } from 'axios';
import { getDefaultExpireTime, getSickURL } from '../utils/sickUtility';

export interface SickServiceInterface {
  getSickListByQuery: (query: string) => Promise<ISickList>;
}

export class SickService implements SickServiceInterface {
  private axiosClient: AxiosInstance;
  private cachedData = [] as ISickCache[];

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  getCachedData = (query:string) => {
    return this.cachedData.find((item) => item.query === query);
  };

  clearCachedData = (query:string) => {
    this.cachedData = this.cachedData.filter((item) => item.expireTime > Date.now());
  };

  addToCachedData = (query:string,sickList: iSickChild[]) => {
    this.cachedData.push({
      query: query,
      sickList: sickList,
      expireTime: getDefaultExpireTime(),
    });
  };

  getSickListByQuery = async (query: string) => {

    this.clearCachedData(query);
    const data = this.getCachedData(query);
    if (data) {
      return data.sickList;
    }
    try {
      console.info('calling api');
      const { data } = await this.axiosClient.get(getSickURL(query));
      const spliced = data.splice(0, 7);
     this.addToCachedData(query,spliced);
      return spliced as ISickList;
    } catch (error) {
      throw new Error(error as string);
    }
  };
}

export interface ISickCache {
  query: string;
  sickList: ISickList;
  expireTime: number;
}
