import { getDefaultStore } from 'jotai';
import { type LoaderFunction } from 'react-router-dom';

import { appletIdAtom } from '#/features/applet/applet.store';
import { getAppletData } from '#/lib/aws-s3';

export const loader: LoaderFunction = async ({ params, request }) => {
  let id: string | null | undefined = params.id;
  if (!id) {
    const url = new URL(request.url);
    id = url.searchParams.get('id');
  }
  if (!id) throw new Response('', { status: 404, statusText: 'No Applet Id provided' });
  const initialState = await getAppletData(id);
  if (!initialState) throw new Response('', { status: 404, statusText: 'Applet not found' });
  getDefaultStore().set(appletIdAtom, id);
  return { id, initialState };
};
