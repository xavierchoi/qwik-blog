/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_STORYBLOK_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}