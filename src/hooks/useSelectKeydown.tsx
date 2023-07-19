import {KeyboardEvent, useEffect, useState} from "react";

const useSelectKeydown = ({ listLength, selectHandler }: IUseSelect) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

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
      selectHandler(selectedIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [listLength]);

  return { selectedListItemIndex: selectedIndex, handleKeydownSelect: handleKeydown };
};

interface IUseSelect {
  listLength: number;
  selectHandler: (index: number) => void;
}

export default useSelectKeydown;
