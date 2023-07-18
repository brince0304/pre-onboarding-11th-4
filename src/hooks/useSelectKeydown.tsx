import { KeyboardEvent, RefObject, useEffect, useState } from 'react';

const useSelectKeydown = ({ listLength, callback, ref }: IUseSelect) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSubmitSelected = () => {
    if (selectedIndex >= 0 && selectedIndex < listLength) {
      const selectedElement = ref.current?.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedElement) {
        const value = selectedElement.getAttribute('data-value');
        if (value) {
          callback(value);
        }
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
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSubmitSelected();
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [listLength]);

  return { selectedListItemIndex: selectedIndex, handleKeydownSelect: handleKeydown };
};

interface IUseSelect {
  listLength: number;
  callback: (...args: any[]) => void;
  ref: RefObject<HTMLElement>;
}

export default useSelectKeydown;
