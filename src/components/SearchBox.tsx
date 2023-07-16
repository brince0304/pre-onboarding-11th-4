import * as S from './SearchBox.style';
import SearchButton from './SearchButton';
import ClearButton from './ClearButton';
import { useRef } from 'react';
import useInput from '../hooks/useInput';
import useChildBox from '../hooks/useChildBox';

const SearchBox = () => {
  const { value: input, onChange, setValue } = useInput('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClear = () => {
    setValue('');
  };
  const { isFocus, handleFocus } = useChildBox(containerRef);
  return (
    <S.Container ref={containerRef}>
      <S.Input
        onChange={onChange}
        value={input}
        placeholder="질환명을 입력해주세요."
        ref={inputRef}
        onFocus={handleFocus}
      />
      {isFocus && <ClearButton onClick={handleClear} />}
      <SearchButton />
    </S.Container>
  );
};

export default SearchBox;
