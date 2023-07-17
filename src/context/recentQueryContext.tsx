import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ILocalRecentQueryRepository } from '../repository/localStorageRepository';
import { localStorageQueryListName } from '../utils/sickUtility';

const recentQueryContext = createContext<IRecentQueryContext>({} as IRecentQueryContext);
export const useRecentQuery = () => useContext(recentQueryContext);

const RecentQueryProvider = ({
  children,
  localStorageRepository,
}: {
  children: ReactNode;
  localStorageRepository: ILocalRecentQueryRepository;
}) => {
  const get = localStorageRepository.get.bind(localStorageRepository);
  const save = localStorageRepository.save.bind(localStorageRepository);
  const [recentQueryFromStorage, setRecentQueryFromStorage] = useState<string[]>([]); // [1
  useEffect(() => {
    setRecentQueryFromStorage(JSON.parse(get() || '[]'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem(localStorageQueryListName)]);

  const setRecentQuery = (query: string) => {
    const queryList = JSON.parse(get() || '[]');
    if (queryList.indexOf(query) === -1) {
      queryList.unshift(query);
      const spliced = queryList.splice(0, 5);
      save(JSON.stringify(spliced));
      setRecentQueryFromStorage(queryList);
    }
  };

  useEffect(() => {
    setRecentQueryFromStorage(JSON.parse(get() || '[]'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <recentQueryContext.Provider value={{ recentQuery: recentQueryFromStorage, setRecentQuery }}>
      {children}
    </recentQueryContext.Provider>
  );
};

interface IRecentQueryContext {
  recentQuery: string[];
  setRecentQuery: (value: string) => void;
}

export default RecentQueryProvider;