import { createContext, ReactNode, useContext } from 'react';
import { SickServiceInterface } from '../service/sickService';
import { ISickList } from '../interfaces/iSickList';

const sickServiceContext = createContext<ISickContext>({} as ISickContext);
export const useSickService = () => useContext(sickServiceContext);

export const SickServiceProvider = ({
  children,
  sickService,
}: {
  children: ReactNode;
  sickService: SickServiceInterface;
}) => {
  const getSickListByQuery = sickService.getSickListByQuery.bind(sickService);
  return <sickServiceContext.Provider value={{ getSickListByQuery }}>{children}</sickServiceContext.Provider>;
};

interface ISickContext {
  getSickListByQuery: (query: string) => () => Promise<ISickList>;
}
