import { ISickList } from '../interfaces/iSickList';
import { AxiosInstance } from 'axios';
import { getSickURL } from '../utils/sickUtility';

export interface SickServiceInterface {
  getSickListByQuery: (query: string) => Promise<ISickList>;
}

export class SickService implements SickServiceInterface {
  axiosClient: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  getSickListByQuery = async (query: string) => {
    const { data } = await this.axiosClient.get(getSickURL(query));
    return data as ISickList;
  };
}
