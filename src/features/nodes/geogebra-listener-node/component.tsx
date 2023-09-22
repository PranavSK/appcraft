import { useAtomValue } from 'jotai';
import { type FC, useEffect } from 'react';

import { useAppletStoreBoundFunction } from '#/features/applet/applet.store';
import { useGeogebraApi, useGeogebraId } from '#/features/integrations/geogebra';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id }) => {
  const { object, onObjectValueChanged } = useAtomValue(nodeStateAtomFamily(id));

  const ggbId = useGeogebraId();
  const api = useGeogebraApi(ggbId);

  const onObjectValueChangedImpl = useAppletStoreBoundFunction('value', onObjectValueChanged ?? '');

  useEffect(() => {
    if (api && object) {
      api.registerObjectUpdateListener(object, () => {
        const value = api.getValue(object);
        onObjectValueChangedImpl(value);
      });
      return () => {
        api.unregisterObjectUpdateListener(object);
      };
    }
  }, [api, object, onObjectValueChangedImpl]);
  return <></>;
};
