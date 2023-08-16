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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/features/ui/select';

import { NodePropertyEditorProps } from '../node.types';
import { defaultState, type ParagraphState, schema } from './data';
import { nodeStateAtomFamily } from './store';

export const PropertyEditor: FC<NodePropertyEditorProps> = ({ id }) => {
  const [state, setState] = useAtom(nodeStateAtomFamily(id));
  const form = useForm<ParagraphState>({
    resolver: zodResolver(schema),
    values: merge(defaultState, state),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(setState)} className="space-y-4">
        <FormField
          control={form.control}
          name="textAlign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Align</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Variant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="left">left</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="right">right</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the horizontal text alignment within the paragraph widget.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <EditGridFields control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
