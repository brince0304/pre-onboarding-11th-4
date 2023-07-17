import * as S from './SearchBox.style';
import ClearButton from './ClearButton';
import { FormEvent, useEffect, useRef } from 'react';
import useChildBox from '../../hooks/useChildBox';
import RecommendBox from '../RecommendBox/RecommendBox';
import useSickList from '../../hooks/useSickList';
import useInput from '../../hooks/useInput';
import useDebounce from '../../hooks/useDebounce';
import { useSickService } from '../../context/sickContext';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {
  const { value: input, setValue: setInput, onChange: inputOnchange } = useInput('');
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const handleClear = () => {
    if(input.length === 0) return;
    setInput('');
    handleClearList();
  };
  const { isFocus, handleFocus } = useChildBox(formRef);
  const { handleGetSickList, sickList, handleClearList } = useSickList();
  const { setRecentQuery } = useSickService();
  const getSickListCallback = async () => {
    if (input.length > 0) {
      await handleGetSickList(input);
    } else if (input.length === 0) {
      handleClearList();
    }
  };
  useDebounce(getSickListCallback, 200, [input]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input !== '') {
      setRecentQuery(input);
    }
  };
  useEffect(() => {
    if (input.length === 0) {
      handleClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <S.Form ref={formRef} isFocused={isFocus} onSubmit={onSubmit}>
      <S.Input
        onChange={inputOnchange}
        value={input}
        placeholder="질환명을 입력해주세요."
        ref={inputRef}
        onFocus={handleFocus}
      />
      {isFocus && <ClearButton onClick={handleClear} />}
      <S.Button type={'submit'}>
        <SearchIcon sx={{ color: '#fff' }} />
      </S.Button>
      {isFocus && (
        <RecommendBox setInput={setInput} input={input} sickList={sickList} showRecentQueries={input.length === 0} />
      )}
    </S.Form>
  );
};

export default SearchBox;
