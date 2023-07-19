import { RefObject, useCallback, useEffect, useState } from 'react';

const useChildBox = (ref: RefObject<HTMLElement>) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsFocus(false);
      }
    },
    [ref],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return { isFocus, setIsFocus };
};

export default useChildBox;
