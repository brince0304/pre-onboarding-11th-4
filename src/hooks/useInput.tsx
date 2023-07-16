import { ChangeEvent, useState } from 'react';

const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange, setValue };
};

export default useInput;
