import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue } from 'jotai';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { merge } from 'remeda';
import { z } from 'zod';

import { useParent, useSiblingIndex } from '#/features/applet/applet.store';
import { EditGridFields } from '#/features/nodes/common/components';
import { Button } from '#/features/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/features/ui/form';
import { Input } from '#/features/ui/input';
import { Separator } from '#/features/ui/separator';

import { NodePropertyEditorProps } from '../node.types';
import { nodeStateAtomFamily as tableStateAtomFamily } from '../table-node/store';
import { defaultState, schema, type TableCellState } from './data';
import { nodeStateAtomFamily } from './store';

export const PropertyEditor: FC<NodePropertyEditorProps> = ({ id }) => {
  const [state, setState] = useAtom(nodeStateAtomFamily(id));
  const parentTableId = useParent(id);
  const { columns, rows, showHeader } = useAtomValue(tableStateAtomFamily(parentTableId));
  const siblingIndex = useSiblingIndex(id);
  const form = useForm<TableCellState>({
    resolver: zodResolver(
      schema.superRefine(({ rowspan, colspan }, ctx) => {
        if (showHeader && siblingIndex < columns && rowspan > 1) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Rowspan cannot be greater than 1 for header cells.',
            path: ['rowspan'],
          });
        }

        if (colspan > columns) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Colspan cannot be greater than the number of columns.',
            path: ['colspan'],
          });
        }

        if (rowspan > rows) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Rowspan cannot be greater than the number of rows.',
            path: ['rowspan'],
          });
        }
      }),
    ),
    values: merge(defaultState, state),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(setState)} className="space-y-4">
        <FormField
          control={form.control}
          name="colspan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colspan</FormLabel>
              <FormControl>
                <Input placeholder="property..." {...field} />
              </FormControl>
              <FormDescription>No. of columns this cell spans.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rowspan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rowspan</FormLabel>
              <FormControl>
                <Input placeholder="property..." {...field} />
              </FormControl>
              <FormDescription>No. of rows this cell spans.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <EditGridFields control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
