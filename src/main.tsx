import '#/styles/global.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { ErrorPage } from './pages/error';

const container = document.getElementById('root');
if (container) {
  const router = createHashRouter([
    {
      path: '/',
      lazy: () => import('./pages/home'),
    },
    {
      path: '/view',
      lazy: () => import('./pages/applet'),
      errorElement: <ErrorPage />,
      loader: async (args) => {
        const { loader } = await import('./pages/applet-loader');
        return loader(args);
      },
    },
    {
      path: '/view/:id',
      lazy: () => import('./pages/applet'),
      errorElement: <ErrorPage />,
      loader: async (args) => {
        const { loader } = await import('./pages/applet-loader');
        return loader(args);
      },
    },
    {
      path: '/edit',
      lazy: () => import('./pages/editor'),
      errorElement: <ErrorPage />,
      loader: async (args) => {
        const { loader } = await import('./pages/editor-loader');
        return loader(args);
      },
    },
    {
      path: '/edit/:id',
      lazy: () => import('./pages/editor'),
      errorElement: <ErrorPage />,
      loader: async (args) => {
        const { loader } = await import('./pages/editor-loader');
        return loader(args);
      },
      action: async (args) => {
        const { action } = await import('./pages/editor-action');
        return action(args);
      },
    },
  ]);
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <div className="bg-background font-sans">
        <RouterProvider router={router} />
      </div>
    </StrictMode>,
  );
}
