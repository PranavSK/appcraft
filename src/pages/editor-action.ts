import { type ActionFunction, redirect } from 'react-router-dom';

import { putAppletData } from '#/lib/aws-s3';

export const action: ActionFunction = async ({ params, request }) => {
  if (!params.id) throw new Error('Invalid applet id');
  const json = await request.json();
  await putAppletData(params.id, json);
  return redirect(`/edit/${params.id}`);
};
