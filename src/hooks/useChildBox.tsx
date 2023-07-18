import { RefObject, useEffect, useState } from 'react';

const useChildBox = (ref: RefObject<HTMLElement>) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsFocus(false);
    }
  };
  const handleBlur = () => {
    setIsFocus(false);
    ref.current?.blur();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isFocus, handleFocus, handleBlur };
};

export default useChildBox;
