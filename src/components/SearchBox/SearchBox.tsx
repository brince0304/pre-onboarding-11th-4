import * as S from './SearchBox.style';
import React, { useRef } from 'react';
import RecommendBox from '../RecommendBox/RecommendBox';
import useInput from '../../hooks/useInput';
import useChildBox from '../../hooks/useChildBox';
import useSickList from '../../hooks/useSickList';
import { useRecentQuery } from '../../context/recentQueryContext';
import useSelectKeydown from '../../hooks/useSelectKeydown';
import { IRecommendBoxProps, ISearchFormProps } from '../../interfaces/searchBox';
import SearchForm from './SearchForm';

const SearchBox = () => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const { value, setValue } = useInput('');
  const { isFocus: isInputFocus, setIsFocus } = useChildBox(searchBoxRef);
  const { sickList } = useSickList();
  const { addRecentQuery } = useRecentQuery();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitHandler = (value: string) => {
    addRecentQuery(value);
    alert(`검색어 : ${value}`);
    setIsFocus(false);
    inputRef.current?.blur();
    formRef.current?.reset();
    setValue('');
  };
  const listLength = sickList ? sickList.length : 0;

  const { selectedListItemIndex, handleKeydownSelect, listRef } = useSelectKeydown({
    listLength: listLength,
    selectHandler: submitHandler,
  });
  const searchFormProps = {
    isInputFocus,
    selectedListItemIndex,
    handleKeydownSelect,
    setIsFocus,
    value,
    setValue,
    submitHandler,
    refs: { inputRef, formRef },
  } as ISearchFormProps;
  const recommendBoxProps = {
    selectedListItemIndex,
    submitHandler,
    value,
    selectedListRef: listRef,
  } as IRecommendBoxProps;

  return (
    <S.SearchBoxWrapper ref={searchBoxRef}>
      <SearchForm {...searchFormProps} />
      {isInputFocus && <RecommendBox {...recommendBoxProps} />}
    </S.SearchBoxWrapper>
  );
};

export default SearchBox;
