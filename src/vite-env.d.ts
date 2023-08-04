/// <reference types="vite/client" />

// FIXME: Remove sensitive imports as below!!
interface ImportMetaEnv {
  readonly VITE_AWS_ACCESS_KEY_ID: string;
  readonly VITE_AWS_SECRET_ACCESS_KEY: string;
  readonly VITE_STAGE_AWS_ACCESS_KEY_ID: string;
  readonly VITE_STAGE_AWS_SECRET_ACCESS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
