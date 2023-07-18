import * as S from './SearchBox.style';
import React, { useRef } from 'react';
import RecommendBox from '../RecommendBox/RecommendBox';
import SearchForm from './SearchForm';
import useInput from '../../hooks/useInput';
import useChildBox from '../../hooks/useChildBox';
import useSickList from '../../hooks/useSickList';
import { useRecentQuery } from '../../context/recentQueryContext';
import useSelectKeydown from '../../hooks/useSelectKeydown';
import { IRecommendBoxProps, ISearchFormProps } from '../../interfaces/searchBox';

const SearchBox = () => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const { value, setValue} = useInput('');
  const { isFocus:isInputFocus,setIsFocus } = useChildBox(searchBoxRef);
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
  const boxRef = useRef<HTMLDivElement>(null);
  const { selectedListItemIndex, handleKeydownSelect } = useSelectKeydown({
    listLength: listLength,
    callback: submitHandler,
    ref: boxRef,
  });
  const searchFormProps = {
    isInputFocus,
    selectedListItemIndex,
    handleKeydownSelect,
    setIsFocus,
    value,
    setValue,
    submitHandler,
    refs:{inputRef,formRef}
  } as ISearchFormProps;
  const recommendBoxProps = { selectedListItemIndex, submitHandler, value } as IRecommendBoxProps;

  return (
    <S.SearchBoxWrapper ref={searchBoxRef}>
      <SearchForm {...searchFormProps}
      />
      {isInputFocus && <RecommendBox
        {...recommendBoxProps}
        ref={boxRef}
      />}
    </S.SearchBoxWrapper>
  );
};

export default SearchBox;
