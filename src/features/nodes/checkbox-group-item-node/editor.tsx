import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { merge } from 'remeda';

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
import { Separator } from '#/features/ui/separator';
import { Textarea } from '#/features/ui/textarea';

import { AboutCode } from '../common/components';
import { NodePropertyEditorProps } from '../node.types';
import { type CheckboxGroupItemState, defaultState, schema } from './data';
import { nodeStateAtomFamily } from './store';

export const PropertyEditor: FC<NodePropertyEditorProps> = ({ id }) => {
  const [state, setState] = useAtom(nodeStateAtomFamily(id));
  const form = useForm<CheckboxGroupItemState>({
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
              <FormDescription>Variant of the checkbox.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checked"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Checked</FormLabel>
                <FormDescription>Current checked state</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="showIcon"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show Icon</FormLabel>
                <FormDescription>Check to display the icon.</FormDescription>
                <FormMessage />
              </div>
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
        <Separator />
        <FormField
          control={form.control}
          name="onCheckedChange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>On Checked Change</FormLabel>
              <FormControl>
                <Textarea className="font-mono" placeholder="Enter javascript" {...field} />
              </FormControl>
              <FormDescription>
                Enter javascript code that is run on checked state change. The new value is
                available via the variable <code>checked</code>.
                <AboutCode />
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
