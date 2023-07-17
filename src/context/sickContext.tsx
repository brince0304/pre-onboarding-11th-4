import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { SickServiceInterface } from '../service/sickService';
import { ISickList } from '../interfaces/iSickList';
import { sessionStorageQueryListName } from '../utils/sickUtility';

const sickServiceContext = createContext<ISickContext>({} as ISickContext);
export const useSickService = () => useContext(sickServiceContext);

export const SickServiceProvider = ({
  children,
  sickService,
}: {
  children: ReactNode;
  sickService: SickServiceInterface;
}) => {
  const [recentQueryFromStorage, setRecentQueryFromStorage] = useState<string[]>([]); // [1
  const getSickListByQuery = sickService.getSickListByQuery.bind(sickService);

  useEffect(() => {
    setRecentQueryFromStorage(JSON.parse(sessionStorage.getItem(sessionStorageQueryListName) || '[]'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem(sessionStorageQueryListName)]);

  const setRecentQuery = (query: string) => {
    const queryList = JSON.parse(sessionStorage.getItem(sessionStorageQueryListName) || '[]');
    if (queryList.indexOf(query) === -1) {
      queryList.unshift(query);
      const spliced = queryList.splice(0, 5);
      sessionStorage.setItem(sessionStorageQueryListName, JSON.stringify(spliced));
      setRecentQueryFromStorage(queryList);
    }
  };
  useEffect(() => {
    setRecentQueryFromStorage(JSON.parse(sessionStorage.getItem(sessionStorageQueryListName) || '[]'));
  }, []);

  return (
    <sickServiceContext.Provider
      value={{ getSickListByQuery, recentQuery: recentQueryFromStorage, setRecentQuery: setRecentQuery }}
    >
      {children}
    </sickServiceContext.Provider>
  );
};

interface ISickContext {
  getSickListByQuery: (query: string) => Promise<ISickList>;
  recentQuery: string[];
  setRecentQuery: (query: string) => void;
}
