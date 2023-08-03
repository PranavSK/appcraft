import { atom, SetStateAction, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useCallback } from 'react';
import { equals } from 'remeda';

interface HistoryItem {
  undo: () => void;
  redo: () => void;
}
interface History {
  stack: HistoryItem[];
  index: number;
}

const historyAtom = atomWithReset<History>({ stack: [], index: 0 });

export function atomWithHistory<Value>(initialValue: Value) {
  const primitive = atom(initialValue);
  return atom(
    (get) => get(primitive),
    (get, set, update: SetStateAction<Value>) => {
      const prev = get(primitive);
      if (equals(prev, update)) return;
      set(primitive, update);
      const history = get(historyAtom);
      const { stack, index } = history;
      const newStack = stack.slice(0, index);
      const newHistory = {
        stack: [
          ...newStack,
          { undo: () => set(primitive, prev), redo: () => set(primitive, update) },
        ],
        index: index + 1,
      };
      set(historyAtom, newHistory);
    },
  );
}

export function useUndo() {
  const setHistory = useSetAtom(historyAtom);
  return useCallback(() => {
    setHistory(({ stack, index }) => {
      if (index === 0) return { stack, index };
      const { undo } = stack[index - 1];
      undo();
      return { stack, index: index - 1 };
    });
  }, [setHistory]);
}

export function useRedo() {
  const setHistory = useSetAtom(historyAtom);
  return useCallback(() => {
    setHistory(({ stack, index }) => {
      if (index === stack.length) return { stack, index };
      const { redo } = stack[index];
      redo();
      return { stack, index: index + 1 };
    });
  }, [setHistory]);
}

export function useClearHistory() {
  return useResetAtom(historyAtom);
}

export function useReadHistory() {
  return useAtomValue(historyAtom);
}
