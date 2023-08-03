import { useCallback, useState } from 'react';

export const useBoolean = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((currentValue) => !currentValue), []);
  const set = useCallback((newValue: boolean) => setValue(newValue), []);

  return [value, { setTrue, setFalse, set, toggle }] as const;
};
