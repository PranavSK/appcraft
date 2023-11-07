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
          name="showBorder"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show Border</FormLabel>
                <FormDescription>Check to show table border.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="showGrid"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show Grid</FormLabel>
                <FormDescription>Check to show grid lines.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="showHeaderBackground"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show Header Background</FormLabel>
                <FormDescription>Check to show background for the header row.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {form.watch('showHeaderBackground') && (
          <FormField
            control={form.control}
            name="headerColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Header Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
                <FormDescription>Enter the header background color.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="rowHighlightIndex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Row Highlight Index</FormLabel>
              <Select value={field.value.toString()} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Row Index" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {Array.from({ length: form.watch('rows') }).map((_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select which row to highlight.</FormDescription>
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
