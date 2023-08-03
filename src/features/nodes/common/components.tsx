import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { type FC, Suspense, useCallback } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { appletLayoutAtom } from '#/features/applet';
import { selectedNodeAtom } from '#/features/editor/editor.store';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/features/ui/form';
import { Input } from '#/features/ui/input';
import { cn } from '#/lib/utils';

import { getNodeComponent } from '../nodes';
import { GridState } from './data';

const ChildNode: FC<{ id: string }> = ({ id }) => {
  const isSelected = useAtomValue(
    selectAtom(
      selectedNodeAtom,
      useCallback((state) => state.id === id, [id]),
    ),
  );
  const type = useAtomValue(
    selectAtom(
      appletLayoutAtom,
      useCallback((state) => state[id]?.type ?? 'unknown', [id]),
    ),
  );
  const Component = getNodeComponent(type);

  return (
    <Suspense>
      <Component
        id={id}
        className={cn(isSelected && 'rounded-sm outline-dashed outline-1 outline-primary/50')}
      />
    </Suspense>
  );
};

export const ChildrenNode: FC<{ id: string }> = ({ id }) => {
  const children = useAtomValue(
    selectAtom(
      appletLayoutAtom,
      useCallback((state) => state[id].children ?? [], [id]),
    ),
  );

  return (
    <>
      {children.map((child) => (
        <ChildNode key={child} id={child} />
      ))}
    </>
  );
};

export const AboutCode = () => (
  <>
    <br />
    You can access data from other nodes via the{' '}
    <code className="whitespace-nowrap">get(type, id, key)</code> function and set data via the{' '}
    <code className="whitespace-nowrap">set(type, id, key, value)</code> function.
  </>
);

export const EditGridFields = <TField extends FieldValues = GridState>({
  control,
}: {
  control: Control<TField>;
}) => {
  return (
    <>
      <FormField
        control={control}
        name={'rowStart' as Path<TField>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Row Start</FormLabel>
            <FormControl>
              <Input placeholder="0" {...field} />
            </FormControl>
            <FormDescription>Enter the starting row position (vertical) in grid. </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={'rowEnd' as Path<TField>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Row End</FormLabel>
            <FormControl>
              <Input placeholder="0" {...field} />
            </FormControl>
            <FormDescription>Enter the ending row position (vertical) in grid. </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={'columnStart' as Path<TField>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Column Start</FormLabel>
            <FormControl>
              <Input placeholder="0" {...field} />
            </FormControl>
            <FormDescription>
              Enter the starting column position (horizontal) in grid.{' '}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={'columnEnd' as Path<TField>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Column End</FormLabel>
            <FormControl>
              <Input placeholder="0" {...field} />
            </FormControl>
            <FormDescription>
              Enter the ending column position (horizontal) in grid.{' '}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
