import { useEffect, useState } from 'react';

function useDebounce<T>(callback: (value: T) => void, delay: number, dependencies: any[]) {
  const [debouncedCallback, setDebouncedCallback] = useState<(value: T) => void>(() => {});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCallback((value: T) => {
        callback(value);
      });
    }, delay);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return debouncedCallback;
}

export default useDebounce;
