import { atom, useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { type FC, Suspense, useCallback, useMemo } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { appletLayoutAtom } from '#/features/applet/applet.store';
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

import { getNodeComponent } from '../components';
import { nodeStateAtomFamily as groupNodeStateAtomFamily } from '../group-node';
import { GridState } from './data';

function useChildNode(id: string) {
  const selectedAtom = selectAtom(
    appletLayoutAtom,
    useCallback((state) => state[id], [id]),
  );

  const mappedAtom = useMemo(
    () =>
      atom((get) => {
        const { type, groups } = get(selectedAtom);
        const isActive =
          groups.length > 0
            ? groups
                .map((group) => groupNodeStateAtomFamily(group))
                .map(get)
                .some((group) => group.active)
            : true;
        return { type, isActive };
      }),
    [selectedAtom],
  );

  return useAtomValue(mappedAtom);
}

const ChildNode: FC<{ id: string }> = ({ id }) => {
  const isSelected = useAtomValue(
    selectAtom(
      selectedNodeAtom,
      useCallback((state) => state.id === id, [id]),
    ),
  );
  const { type, isActive } = useChildNode(id);
  const Component = getNodeComponent(type);

  return (
    isActive && (
      <Suspense>
        <Component
          id={id}
          className={cn(isSelected && 'rounded-sm outline-dashed outline-1 outline-teal-200/50')}
        />
      </Suspense>
    )
  );
};

export const ChildrenNode: FC<{ id: string }> = ({ id }) => {
  const children = useAtomValue(
    selectAtom(
      appletLayoutAtom,
      useCallback((state) => state[id].children, [id]),
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
