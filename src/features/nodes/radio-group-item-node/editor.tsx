import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { merge } from 'remeda';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/features/ui/select';

import { NodePropertyEditorProps } from '../node.types';
import { defaultState, type RadioGroupItemState, schema } from './data';
import { nodeStateAtomFamily } from './store';

export const PropertyEditor: FC<NodePropertyEditorProps> = ({ id }) => {
  const [state, setState] = useAtom(nodeStateAtomFamily(id));
  const form = useForm<RadioGroupItemState>({
    resolver: zodResolver(schema),
    values: merge(defaultState, state),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(setState)} className="space-y-4">
        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Variant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Variant of the select.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder="value" {...field} />
              </FormControl>
              <FormDescription>
                Enter the item value. Each item&apos;s value needs to be unique.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="textValue" {...field} />
              </FormControl>
              <FormDescription>
                Enter the item text. Use children instead if additional customization is required.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
