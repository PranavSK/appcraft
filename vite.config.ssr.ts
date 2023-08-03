import { mergeConfig } from 'vite';
import { ssr } from 'vite-plugin-ssr/plugin';

import baseConfig from './vite.config';

export default mergeConfig(baseConfig, {
  plugins: [ssr()],
});
