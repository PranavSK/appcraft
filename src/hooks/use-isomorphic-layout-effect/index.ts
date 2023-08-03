import { useEffect, useLayoutEffect } from 'react';

import { isBrowser } from '#/lib/browser';

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
