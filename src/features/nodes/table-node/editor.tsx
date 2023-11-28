import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { merge } from 'remeda';

import { EditGridFields } from '#/features/nodes/common/components';
import { Button } from '#/features/ui/button';
import { Checkbox } from '#/features/ui/checkbox';
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
import { defaultState, schema, type TableState } from './data';
import { nodeStateAtomFamily } from './store';

export const PropertyEditor: FC<NodePropertyEditorProps> = ({ id }) => {
  const [state, setState] = useAtom(nodeStateAtomFamily(id));
  const form = useForm<TableState>({
    resolver: zodResolver(schema),
    values: merge(defaultState, state),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(setState)} className="space-y-4">
        <FormField
          control={form.control}
          name="rows"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rows</FormLabel>
              <FormControl>
                <Input placeholder="property..." {...field} />
              </FormControl>
              <FormDescription>Enter the value.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="columns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Columns</FormLabel>
              <FormControl>
                <Input placeholder="property..." {...field} />
              </FormControl>
              <FormDescription>Enter the value.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="showHeader"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show Header</FormLabel>
                <FormDescription>Check to make the 1st row a header.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {form.watch('showHeader') && (
          <FormField
            control={form.control}
            name="headerColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Header Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
                <FormDescription>Enter the header color.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="highlightColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Highlight Color</FormLabel>
              <FormControl>
                <Input type="color" {...field} />
              </FormControl>
              <FormDescription>Enter the highlight color.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="highlightType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Highlight Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select Highlight Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="row">Row</SelectItem>
                    <SelectItem value="column">Column</SelectItem>
                    <SelectItem value="cell">Cell</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Enter the highlight type.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch('highlightType') !== 'none' && (
          <FormField
            control={form.control}
            name="highlightIndex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Highlight Index</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Select which {form.watch('highlightType')} to highlight.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <EditGridFields control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
