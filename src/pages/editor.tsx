import { useSetAtom } from 'jotai';
import { type FC, useEffect } from 'react';
import { useLoaderData, useSubmit } from 'react-router-dom';

import { type AppletProps } from '#/features/applet';
import { Editor } from '#/features/editor';
import { onSaveAtom } from '#/features/editor/editor.store';

const EditorPage: FC = () => {
  const props = useLoaderData() as AppletProps;
  const setOnSave = useSetAtom(onSaveAtom);
  const submit = useSubmit();

  useEffect(() => {
    setOnSave((state, id) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      submit(state as any, {
        method: 'PUT',
        action: `/edit/${id}`,
        encType: 'application/json',
      }),
    );
  }, [setOnSave, submit]);
  return (
    <div className="h-screen w-screen">
      <Editor {...props} />
    </div>
  );
};

export { EditorPage as Component };
