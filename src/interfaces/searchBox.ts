import React, { ForwardedRef, MutableRefObject } from 'react';

export interface ISearchFormProps {
  isInputFocus: boolean;
  setValue: (value: string) => void;
  handleKeydownSelect: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setIsFocus: (isFocus: boolean) => void;
  refs: { inputRef: ForwardedRef<HTMLInputElement>; formRef: ForwardedRef<HTMLFormElement> };
  value: string;
  submitHandler: (...args: any[]) => void;
  selectedListItemIndex: number;
}

export interface IRecommendBoxProps {
  value: string;
  submitHandler: (...args: any[]) => void;
  selectedListItemIndex: number;
  selectedListRef: MutableRefObject<HTMLDivElement[]>;
}
