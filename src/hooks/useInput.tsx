import { ChangeEvent, useState } from 'react';

const useInput = <T,>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  };

  return {
    value,
    onChange,
    setValue,
  };
};

export default useInput;
