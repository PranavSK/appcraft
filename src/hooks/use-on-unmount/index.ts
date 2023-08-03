import { useEffect, useRef } from 'react';

export const useOnUnmount = (fn: () => void) => {
  const fnRef = useRef(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
};
