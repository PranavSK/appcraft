import react from '@vitejs/plugin-react-swc';
import vConsolePlugin from 'vite-plugin-simple-vconsole';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // plugins: [
      //   ['@swc-jotai/debug-label', {}],
      //   ['@swc-jotai/react-refresh', {}],
      // ],
    }),
    tsconfigPaths(),
    vConsolePlugin({
      enable: true,
    }),
  ],
  base: './',
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*(*.)?{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
  },
});
