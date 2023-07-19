import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ILocalRecentQueryRepository } from '../repository/localRecentQueryRepository';

const recentQueryContext = createContext<IRecentQueryContext>({} as IRecentQueryContext);
export const useRecentQuery = () => useContext(recentQueryContext);

const RecentQueryProvider = ({
  children,
  localStorageRepository,
}: {
  children: ReactNode;
  localStorageRepository: ILocalRecentQueryRepository;
}) => {
  const getFromLocalStorage = localStorageRepository.getFromLocalStorage.bind(localStorageRepository);
  const addRecentQuery = localStorageRepository.addRecentQuery.bind(localStorageRepository);
  const deleteRecentQuery = localStorageRepository.deleteRecentQuery.bind(localStorageRepository);
  const [list, setList] = useState<string[]>([]);

  const handleAddRecentQuery = (value: string) => {
    addRecentQuery(value);
    setList(getFromLocalStorage());
  };

  const handleDeleteRecentQuery = (value: string) => {
    deleteRecentQuery(value);
    setList(getFromLocalStorage());
  };

  useEffect(() => {
    setList(getFromLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <recentQueryContext.Provider
      value={{ recentQuery: list, addRecentQuery: handleAddRecentQuery, deleteRecentQuery: handleDeleteRecentQuery }}
    >
      {children}
    </recentQueryContext.Provider>
  );
};

interface IRecentQueryContext {
  recentQuery: string[];
  addRecentQuery: (value: string) => void;
  deleteRecentQuery: (value: string) => void;
}

export default RecentQueryProvider;
