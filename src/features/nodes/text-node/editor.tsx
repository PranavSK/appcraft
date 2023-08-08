import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { type CSSProperties, type FC } from 'react';
import { useForm } from 'react-hook-form';

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

import { NodePropertyEditorProps } from '../node.types';
import { textSchema, type TextState } from './data';
import { nodeStateAtomFamily } from './store';

interface CustomStyle extends CSSProperties {
  '--editor-color-input': string;
}

function getCustomStyle(color: string | undefined): CustomStyle {
  return {
    '--editor-color-input': color ?? '#000000',
  };
}

export const PropertyEditor: FC<NodePropertyEditorProps> = ({ id }) => {
  const [state, setState] = useAtom(nodeStateAtomFamily(id));

  const form = useForm<TextState>({
    resolver: zodResolver(textSchema),
    values: state,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(setState)} className="space-y-4">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="sample" {...field} />
              </FormControl>
              <FormDescription>Enter the text to display.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="#000000" {...field} />
              </FormControl>
              <FormDescription>
                [Optional]{' '}
                {field.value == null ? (
                  <span>Enter the text color.</span>
                ) : (
                  <>
                    Selected text color:
                    <span
                      style={getCustomStyle(field.value)}
                      className="mx-2 inline-block h-6 w-6 translate-y-1 rounded-md bg-[_var(--editor-color-input)]"
                    />
                  </>
                )}
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
