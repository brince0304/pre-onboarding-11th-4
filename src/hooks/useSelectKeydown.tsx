import { KeyboardEvent, useEffect, useState } from 'react';

const useSelectKeydown = ({ listLength, callback }: IUseSelect) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleSubmitSelected = () => {
    const selected = document.getElementsByClassName('selected');
    if (selected.length > 0) {
      const selectedValue = selected[0].textContent;
      if (selectedValue) {
        callback && callback(selectedValue);
      }
    }
  };
  const handleKeydown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % listLength);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + listLength) % listLength);
    } else if (e.key === 'Enter' && listLength >= 1 && selectedIndex >= 0) {
      e.preventDefault();
      handleSubmitSelected();
    }
  };
  useEffect(() => {
    setSelectedIndex(-1);
  }, [listLength]);
  return { selectedIndex, handleKeydown: handleKeydown };
};

interface IUseSelect {
  listLength: number;
  callback?: (value: string) => void;
}

export default useSelectKeydown;
