import { getDefaultStore } from 'jotai';
import { type LoaderFunction } from 'react-router-dom';

import { appletIdAtom } from '#/features/applet';
import { getAppletData } from '#/lib/aws-s3';

export const loader: LoaderFunction = async ({ params, request }) => {
  let id: string | null | undefined = params.id;
  if (!id) {
    const url = new URL(request.url);
    id = url.searchParams.get('id');
  }
  let initialState;
  if (id) initialState = await getAppletData(id);
  getDefaultStore().set(appletIdAtom, id);
  return { id, initialState };
};
