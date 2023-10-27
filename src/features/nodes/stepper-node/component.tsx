import { useAtom } from 'jotai';
import { type FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { clamp } from 'remeda';

import { useAppletStoreBoundFunction, useHasChildren } from '#/features/applet/applet.store';
import { Text } from '#/features/ui/text';
import { Widget } from '#/features/ui/widget';
import { cn } from '#/lib/utils';

import { ChildrenNode } from '../common/components';
import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

const Button: FC<PropsWithChildren<{ onClick: () => void }>> = ({ children, onClick }) => (
  <button
    className="h-[3.75rem] w-[3.75rem] rounded-full p-5 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
    onClick={onClick}
  >
    {children}
  </button>
);

const Minus: FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.26237 11.2774H9.14286H2V9H9.14286L9.08333 9.00001H11.4643L11.5238 9H18.6667L18.7262 11.2774H11.5833H11.4368H9.26237Z"
      fill="currentColor"
    />
  </svg>
);

const Plus: FC = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.14286 17.942V11.1097H2V8.8323H9.14286V2H11.5238V8.8323H18.6667V11.1097H11.5238V17.942H9.14286Z"
      fill="currentColor"
    />
  </svg>
);

export const Component: FC<NodeProps> = ({ id, className }) => {
  const [{ value, min, max, step, onValueChange, ...state }, setState] = useAtom(
    nodeStateAtomFamily(id),
  );
  const hasLabelChildren = useHasChildren(id, 'label');
  const onValueChangeImpl = useAppletStoreBoundFunction('value', onValueChange ?? '');

  const stepPrecision = useMemo(() => step.toString().split('.')[1]?.length ?? 0, [step]);
  const valueText = value.toFixed(stepPrecision);

  const handleAdd = useCallback(() => {
    setState((prev) => {
      const { value, min, max, step } = prev;
      const newValue = parseFloat(clamp(value + step, { min, max }).toFixed(stepPrecision));
      if (newValue !== value) {
        onValueChangeImpl(newValue);
      }
      return { ...prev, value: newValue };
    });
  }, [onValueChangeImpl, setState, stepPrecision]);

  const handleSubtract = useCallback(() => {
    setState((prev) => {
      const { value, min, max, step } = prev;
      const newValue = clamp(value - step, { min, max });
      if (newValue !== value) {
        onValueChangeImpl(newValue);
      }
      return { ...prev, value: newValue };
    });
  }, [onValueChangeImpl, setState]);

  return (
    <Widget className={cn('flex flex-col items-center justify-center gap-3', className)} {...state}>
      {hasLabelChildren && <ChildrenNode id={id} slot="label" />}
      <div className="flex items-center justify-between gap-[0.625rem] self-stretch rounded-md border border-[#1a1a1a]">
        <Button onClick={handleSubtract}>
          <Minus />
        </Button>
        <Text className="text-xl" text={valueText} />
        <Button onClick={handleAdd}>
          <Plus />
        </Button>
      </div>
    </Widget>
  );
};
