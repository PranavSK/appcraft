import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import vConsolePlugin from 'vite-plugin-simple-vconsole';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    vConsolePlugin({
      enable: false,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        importScripts: ['https://www.geogebra.org/apps/latest/web3d/sworker-locked.js'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/s3-whjr-prod-cocos-applet.whjr.online\/app-craft/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'app-craft',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
        ],
      },
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
