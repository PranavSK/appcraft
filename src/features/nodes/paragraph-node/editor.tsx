import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';

import { EditGridFields } from '#/features/nodes/common';
import { Button } from '#/features/ui/button';
import { Form } from '#/features/ui/form';

import { NodePropertyEditorProps } from '../node.types';
import { type ParagraphState, schema } from './data';
import { nodeStateAtomFamily } from './store';

export const PropertyEditor: FC<NodePropertyEditorProps> = ({ id }) => {
  const [state, setState] = useAtom(nodeStateAtomFamily(id));
  const form = useForm<ParagraphState>({
    resolver: zodResolver(schema),
    values: state,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(setState)} className="space-y-4">
        <EditGridFields control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
