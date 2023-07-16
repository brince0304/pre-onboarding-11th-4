const getSickURL = (query: string) => {
  return '/sick?q=' + query;
};
const getDefaultExpireTime = () => {
  return Date.now() + 1000 * 60 * 5;
};

export { getSickURL, getDefaultExpireTime };
