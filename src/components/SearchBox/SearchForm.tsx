import React, { FormEvent, forwardRef, useEffect } from 'react';
import useSickList from '../../hooks/useSickList';
import useDebounce from '../../hooks/useDebounce';
import * as S from './SearchBox.style';
import ClearButton from './ClearButton';
import SearchIcon from '@mui/icons-material/Search';
import { ISearchFormProps } from 'interfaces/searchBox';
const SearchForm = ({
  value,
  setValue,
  setIsFocus,
  isInputFocus,
  submitHandler,
  selectedListItemIndex,
  handleKeydownSelect,
  refs,
}: ISearchFormProps) => {
  const { handleFetchSickList, handleClearList } = useSickList();
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length === 0) return;
    submitHandler(value);
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (value.length === 0) return;
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && selectedListItemIndex === -1) {
      e.preventDefault();
      submitHandler(value);
    }
  };
  const debouncedHandleFetchList = useDebounce(async () => {
    await handleFetchSickList(value);
  }, 300);

  useEffect(() => {
    if (value === '') handleClearList();
    debouncedHandleFetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClearValue = () => {
    setValue('');
  };

  return (
    <S.Form ref={refs.formRef} isFocused={isInputFocus} onSubmit={handleSubmitForm} onKeyDown={handleKeyDownEnter}>
      <S.Input
        onFocus={(e) => {
          setIsFocus(true);
        }}
        onChange={onChangeValue}
        value={value}
        placeholder="질환명을 입력해주세요."
        inputRef={refs.inputRef}
        onKeyDown={handleKeydownSelect}
      />
      {isInputFocus && <ClearButton onClick={handleClearValue} />}
      <S.Button type={'submit'}>
        <SearchIcon sx={{ color: '#fff' }} />
      </S.Button>
    </S.Form>
  );
};

export default forwardRef(SearchForm);
