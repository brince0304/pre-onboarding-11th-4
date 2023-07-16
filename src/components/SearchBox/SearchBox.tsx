import * as S from './SearchBox.style';
import SearchButton from './SearchButton';
import ClearButton from './ClearButton';
import { useRef } from 'react';
import useChildBox from '../../hooks/useChildBox';
import RecommendBox from '../RecommendBox/RecommendBox';
import useSickList from '../../hooks/useSickList';
import useInput from '../../hooks/useInput';
import useDebounce from '../../hooks/useDebounce';

const SearchBox = () => {
  const { value: input, setValue: setInput, onChange: inputOnchange } = useInput('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClear = () => {
    setInput('');
    handleClearList();
  };
  const { isFocus, handleFocus } = useChildBox(containerRef);
  const { handleGetSickList, sickList, handleClearList } = useSickList();
  const getSickListCallback = async () => {
    if (input.length > 0) {
      await handleGetSickList(input);
    } else if (input.length === 0) {
      handleClearList();
    }
  };
  useDebounce(getSickListCallback, 300, [input]);
  return (
    <S.Container ref={containerRef} isFocused={isFocus}>
      <S.Input
        onChange={inputOnchange}
        value={input}
        placeholder="질환명을 입력해주세요."
        ref={inputRef}
        onFocus={handleFocus}
      />
      {isFocus && <ClearButton onClick={handleClear} />}
      <SearchButton />
      {isFocus && <RecommendBox sickList={sickList} />}
    </S.Container>
  );
};

export default SearchBox;
