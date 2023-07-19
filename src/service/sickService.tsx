import { ISickList } from '../interfaces/iSickList';
import { AxiosInstance } from 'axios';
import { getSickURL } from '../utils/sickUtility';
import { ILocalStorageSickCacheRepository } from '../repository/localStorageRepository';

export interface SickServiceInterface {
  getSickListByQuery: (query: string) => Promise<ISickList>;
}

export class SickService implements SickServiceInterface {
  private axiosClient: AxiosInstance;
  private cacheRepository: ILocalStorageSickCacheRepository;

  constructor(axiosClient: AxiosInstance, cacheRepository: ILocalStorageSickCacheRepository) {
    this.axiosClient = axiosClient;
    this.cacheRepository = cacheRepository;
  }

  getSickListByQuery = async (query: string) => {
    const data = this.cacheRepository.getCachedData(query);
    if (data) {
      return data;
    }
    try {
      console.info('calling api');
      const { data } = await this.axiosClient.get(getSickURL(query));
      const spliced = data.splice(0, 7);
      this.cacheRepository.addToCachedData(query, spliced);
      return spliced as ISickList;
    } catch (error) {
      throw new Error(error as string);
    }
  };
}
