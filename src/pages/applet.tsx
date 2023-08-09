import { type CSSProperties, type FC, useCallback, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Applet, type AppletState } from '#/features/applet';

interface LoadedData {
  initialState: AppletState;
  id: string;
}

interface CustomStyle extends CSSProperties {
  '--doc-height': string;
}

function getCustomStyle(height: number | undefined): CustomStyle {
  return {
    '--doc-height': `${height}px` ?? '100vh',
  };
}

function useDocumentHeight() {
  const [height, setHeight] = useState<number | undefined>();

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return getCustomStyle(height);
}

const AppletPage: FC = () => {
  const { initialState } = useLoaderData() as LoadedData;
  const style = useDocumentHeight();

  return (
    <div className="box-border h-[_var(--doc-height)] p-1 xl:container" style={style}>
      <Applet initialState={initialState} />
    </div>
  );
};

export { AppletPage as Component };
