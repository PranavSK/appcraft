import { useState } from 'react';

import { useLayoutEffectPostLoad } from '#/hooks/use-effect-post-load';

export const useHasChanged = <T>(value: T) => {
  const [hasChanged, setChanged] = useState(false);
  useLayoutEffectPostLoad(() => setChanged(true), [value]);
  return hasChanged;
};
