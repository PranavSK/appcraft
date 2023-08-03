import { createContext, type Dispatch, type SetStateAction, useContext } from 'react';

const SplitContext = createContext<{
  split: number;
  setSplit: Dispatch<SetStateAction<number>>;
  orientation: 'horizontal' | 'vertical';
  containerSize: number;
  // primarySize: number;
  // separatorSize: number;
} | null>(null);

export const SplitContextProvider = SplitContext.Provider;

export function useSplitContext() {
  const splitData = useContext(SplitContext);
  if (splitData === null) {
    throw new Error('useSplitContext must be used within a SplitContextProvider');
  }

  return splitData;
}
