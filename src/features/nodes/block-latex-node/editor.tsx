import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { merge } from 'remeda';

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
import { Separator } from '#/features/ui/separator';
import { Textarea } from '#/features/ui/textarea';

import { NodePropertyEditorProps } from '../node.types';
import { type BlockLatexState, defaultState, schema } from './data';
import { nodeStateAtomFamily } from './store';

export const PropertyEditor: FC<NodePropertyEditorProps> = ({ id }) => {
  const [state, setState] = useAtom(nodeStateAtomFamily(id));
  const form = useForm<BlockLatexState>({
    resolver: zodResolver(schema),
    values: merge(defaultState, state),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(setState)} className="space-y-4">
        <FormField
          control={form.control}
          name="latex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latex</FormLabel>
              <FormControl>
                <Textarea className="font-mono" placeholder="Enter \\Latex" {...field} />
              </FormControl>
              <FormDescription>
                Enter LaTex expression. See{' '}
                <a href="https://katex.org/docs/supported.html" target="_blank" rel="noreferrer">
                  KaTex Supported Functions
                </a>
                .
              </FormDescription>
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
