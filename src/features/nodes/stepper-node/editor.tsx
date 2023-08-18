import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { merge } from 'remeda';

import { AboutCode, EditGridFields } from '#/features/nodes/common/components';
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
import { Textarea } from '#/features/ui/textarea';

import { NodePropertyEditorProps } from '../node.types';
import { defaultState, schema, type StepperState } from './data';
import { nodeStateAtomFamily } from './store';

export const PropertyEditor: FC<NodePropertyEditorProps> = ({ id }) => {
  const [state, setState] = useAtom(nodeStateAtomFamily(id));
  const form = useForm<StepperState>({
    resolver: zodResolver(schema),
    values: merge(defaultState, state),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(setState)} className="space-y-4">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormDescription>Current value of the slider.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormDescription>Minimum value of the slider.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max</FormLabel>
              <FormControl>
                <Input placeholder="100" {...field} />
              </FormControl>
              <FormDescription>Maximum value of the slider.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="step"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Step</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormDescription>Step value of the slider.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="onValueChange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>On Value Change</FormLabel>
              <FormControl>
                <Textarea className="font-mono" placeholder="Enter javascript" {...field} />
              </FormControl>
              <FormDescription>
                Enter javascript code that is run on slider value change. The new value is available
                via the variable <code>value</code>.
                <AboutCode />
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
