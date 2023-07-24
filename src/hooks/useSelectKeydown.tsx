import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

const useSelectKeydown = ({ listLength, selectHandler }: IUseSelect) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement[]>([]);

  const removeSelectedClass = useCallback((index: number) => {
    const element = listRef.current[index];
    if (element) {
      element.classList.remove('selected');
    }
  }, []);
  // TODO : 선택 핸들링로직 구현 필요
  const addSelectedClass = useCallback((index: number) => {
    const element = listRef.current[index];
    if (element) {
      element.classList.add('selected');
    }
  }, []);

  const handleSubmitSelected = () => {
    if (selectedIndex === -1) return;
    const selectedElement = listRef.current[selectedIndex];
    const value = selectedElement.textContent;
    if (value) {
      selectHandler(value);
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
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [listLength]);

  useEffect(() => {
    // 이전 선택된 인덱스에 대한 'selected' 클래스 제거
    if (selectedIndex !== -1) {
      removeSelectedClass(selectedIndex - 1);
    }
    // 새로운 선택된 인덱스에 대한 'selected' 클래스 추가
    if (selectedIndex !== -1) {
      addSelectedClass(selectedIndex);
    }
  }, [selectedIndex, removeSelectedClass, addSelectedClass]);

  return { selectedListItemIndex: selectedIndex, handleKeydownSelect: handleKeydown, listRef };
};

interface IUseSelect {
  listLength: number;
  selectHandler: (...args: any[]) => void;
}

export default useSelectKeydown;
