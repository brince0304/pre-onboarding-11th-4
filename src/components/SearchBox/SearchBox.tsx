import * as S from './SearchBox.style';
import ClearButton from './ClearButton';
import React, { FormEvent, useEffect, useRef } from 'react';
import useChildBox from '../../hooks/useChildBox';
import RecommendBox from '../RecommendBox/RecommendBox';
import useSickList from '../../hooks/useSickList';
import useInput from '../../hooks/useInput';
import useDebounce from '../../hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import useSelect from '../../hooks/useSelect';
import { useRecentQuery } from '../../context/recentQueryContext';

const SearchBox = () => {
  const { value: input, setValue: setInput, onChange: inputOnchange } = useInput('');
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { isFocus, handleFocus } = useChildBox(formRef);
  const { handleGetSickList, sickList, handleClearList } = useSickList();
  const { setRecentQuery } = useRecentQuery();

  const submitCallback = (value: string) => {
    setRecentQuery(value);
    handleClearInput();
  };
  const { selectedIndex, handleKeydown } = useSelect({
    listLength: sickList ? sickList.length : 0,
    callback: submitCallback,
  });
  const getSickListCallback = async () => {
    if (input.length > 0) {
      await handleGetSickList(input);
    } else if (input.length === 0) {
      handleClearList();
    }
  };
  useDebounce(getSickListCallback, 300, [input]);

  const handleClearInput = () => {
    if (input.length === 0) return;
    setInput('');
    handleClearList();
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input !== '') {
      submitCallback(input);
    }
  };
  useEffect(() => {
    if (input.length === 0) {
      handleClearInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <S.Form ref={formRef} isFocused={isFocus} onSubmit={handleSubmitForm}>
      <S.Input
        onKeyDown={handleKeydown}
        onChange={inputOnchange}
        value={input}
        placeholder="질환명을 입력해주세요."
        ref={inputRef}
        onFocus={handleFocus}
      />
      {isFocus && <ClearButton onClick={handleClearInput} />}
      <S.Button type={'submit'}>
        <SearchIcon sx={{ color: '#fff' }} />
      </S.Button>
      {isFocus && (
        <RecommendBox
          selectedIndex={selectedIndex}
          setInput={setInput}
          input={input}
          sickList={sickList}
          showRecentQueries={input.length === 0}
        />
      )}
    </S.Form>
  );
};

export default SearchBox;
