import { RefObject, useCallback, useEffect, useState } from 'react';

const useChildBox = (ref: RefObject<HTMLDivElement>) => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const handleFocus = () => {
    setIsFocus(true)
  }
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsFocus(false);
    }
  }, [ref.current])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [handleClickOutside]);

  return { isFocus, handleFocus }
}

export default useChildBox