import React, { ForwardedRef } from 'react';

export interface ISearchFormProps extends IRecommendBoxProps {
  isInputFocus: boolean;
  setValue: (value: string) => void;
  handleKeydownSelect: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsFocus: (isFocus: boolean) => void;
  refs: { inputRef: ForwardedRef<HTMLInputElement>; formRef: ForwardedRef<HTMLFormElement> };
}

export interface IRecommendBoxProps {
  value: string;
  submitHandler: (...args: any[]) => void;
  selectedListItemIndex: number;
}
