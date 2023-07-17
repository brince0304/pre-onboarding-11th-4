import { ChangeEvent, useState } from 'react';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleClear = () => {
    setValue('');
  };

  return {
    value,
    onChange,
    setValue,
    handleClear,
  };
};

export default useInput;
