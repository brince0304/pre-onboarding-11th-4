import { createContext, ReactNode, useContext } from 'react';
import { SickServiceInterface } from '../service/sickService';

const sickServiceContext = createContext<SickServiceInterface | null>(null);
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
