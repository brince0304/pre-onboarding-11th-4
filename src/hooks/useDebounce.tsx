import { useEffect, useState } from 'react';

const useDebounce = <T,>(callback: (...args: T[]) => void, delay: number, dependencies: any[]) => {
  const [debouncedCallback, setDebouncedCallback] = useState<(...args: T[]) => void>(() => {});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCallback((...args: T[]) => {
        callback(...args);
      });
    }, delay);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return debouncedCallback;
};

export default useDebounce;
