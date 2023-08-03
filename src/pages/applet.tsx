import { type FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Applet, type AppletState } from '#/features/applet';

interface LoadedData {
  initialState: AppletState;
  id: string;
}

const AppletPage: FC = () => {
  const { initialState } = useLoaderData() as LoadedData;

  return (
    <div className="box-border h-screen p-1 xl:container">
      <Applet initialState={initialState} />
    </div>
  );
};

export { AppletPage as Component };
