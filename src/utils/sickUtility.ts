const getSickURL = (query: string) => {
  return '/sick?q=' + query;
};
const getDefaultExpireTime = () => {
  return Date.now() + 1000 * 60 * 10;
};

const localStorageQueryListName = 'recentSickList';
const localStorageSickCacheName = 'sickCache';

export { getSickURL, getDefaultExpireTime, localStorageQueryListName, localStorageSickCacheName };
