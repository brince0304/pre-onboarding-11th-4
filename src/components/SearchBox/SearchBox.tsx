import * as S from './SearchBox.style';
import ClearButton from './ClearButton';
import React, { FormEvent, useEffect, useRef } from 'react';
import useChildBox from '../../hooks/useChildBox';
import RecommendBox from '../RecommendBox/RecommendBox';
import useSickList from '../../hooks/useSickList';
import useInput from '../../hooks/useInput';
import useDebounce from '../../hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import useSelectKeydown from '../../hooks/useSelectKeydown';
import { useRecentQuery } from '../../context/recentQueryContext';

const SearchBox = () => {
  const { value: searchInput, onChange: inputOnChange, handleClear: handleClearInput } = useInput('');
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { isFocus, handleFocus, handleBlur } = useChildBox(formRef);
  const { handleFetchSickList, sickList, handleClearList } = useSickList();
  const { setRecentQuery } = useRecentQuery();
  const submitCallback = (value: string) => {
    setRecentQuery(value);
    alert(`검색어 : ${value}`);
    handleBlur();
    inputRef.current?.blur();
    handleClearInput();
  };
  const { selectedIndex, handleKeydown } = useSelectKeydown({
    listLength: sickList ? sickList.length : 0,
    callback: submitCallback,
    ref: formRef,
  });

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.length === 0) return;
    submitCallback(searchInput);
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (searchInput.length === 0) return;
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && selectedIndex === -1) {
      e.preventDefault();
      submitCallback(searchInput);
    }
  };

  const debouncedHandleFetchList = useDebounce(async () => {
    await handleFetchSickList(searchInput);
  }, 300);

  useEffect(() => {
    if (searchInput === '') handleClearList();
    debouncedHandleFetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <S.Form ref={formRef} isFocused={isFocus} onSubmit={handleSubmitForm} onKeyDown={handleKeyDownEnter}>
      <S.Input
        onFocus={handleFocus}
        onChange={inputOnChange}
        value={searchInput}
        placeholder="질환명을 입력해주세요."
        inputRef={inputRef}
        onKeyDown={handleKeydown}
      />
      {isFocus && <ClearButton onClick={handleClearInput} />}
      <S.Button type={'submit'}>
        <SearchIcon sx={{ color: '#fff' }} />
      </S.Button>
      {isFocus && (
        <RecommendBox
          selectedIndex={selectedIndex}
          submitHandler={submitCallback}
          input={searchInput}
          sickList={sickList}
          showRecentQueries={searchInput.length === 0}
        />
      )}
    </S.Form>
  );
};

export default SearchBox;
