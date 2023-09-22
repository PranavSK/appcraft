import { useSetAtom } from 'jotai';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { useOnUnmount } from '#/hooks/use-on-unmount';
import { useScript } from '#/hooks/use-script';
import { cn } from '#/lib/utils';

import { GeogebraAppApi } from './geogebra.app.types';
import { geogebraApiAtomFamily, IdProvider } from './geogebra.store';
import type { GeogebraProps, GeogebraRef } from './geogebra.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const GGBApplet: any;

function loadGeogebraApplet(
  materialId: string | undefined,
  elementId: string | undefined,
  transparentGraphics = false,
) {
  return new Promise<GeogebraAppApi>((resolve) => {
    const ggbParams = {
      appName: 'classic',
      material_id: materialId,
      showToolBar: false,
      showAlgebraInput: false,
      showMenuBar: false,
      showAnimationButton: false,
      showFullscreenButton: false,
      scaleContainerClass: 'ggb-container',
      transparentGraphics,
      appletOnLoad: resolve,
    };
    const applet = new GGBApplet(ggbParams, true);
    applet.inject(elementId);
  });
}

export const Geogebra = forwardRef<GeogebraRef, GeogebraProps>(
  (
    { id: propId, materialId, transparentGraphics = false, className, children, ...props },
    forwardedRef,
  ) => {
    const scriptStatus = useScript('https://www.geogebra.org/apps/deployggb.js');
    const api = useRef<GeogebraAppApi | null>(null);
    const id = propId ?? materialId ?? 'geogebra';
    const setApi = useSetAtom(geogebraApiAtomFamily(id));

    //TODO: Loading fallback.

    useEffect(() => {
      if (scriptStatus === 'ready') {
        loadGeogebraApplet(materialId, id, transparentGraphics).then((applet) => {
          api.current = applet;
          setApi(applet);
        });
      }

      return () => {
        if (api.current) {
          api.current.remove();
          api.current = null;
          setApi(null);
        }
      };
    }, [id, materialId, scriptStatus, setApi, transparentGraphics]);

    useOnUnmount(() => {
      geogebraApiAtomFamily.remove(id);
    });

    useImperativeHandle(forwardedRef, () => ({
      api: api.current,
    }));

    return (
      <div
        data-testid="geogebra"
        className={cn('ggb-container flex items-center justify-center', className)}
        {...props}
      >
        <div id={id ?? materialId} />
        <IdProvider value={{ id }}>{children}</IdProvider>
      </div>
    );
  },
);
Geogebra.displayName = 'Geogebra';
