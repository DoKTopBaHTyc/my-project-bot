/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_OPENROUTER_API_KEY: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
