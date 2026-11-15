/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the Pet Heaven backend REST API, e.g. "http://localhost:3000". */
  readonly VITE_API_BASE_URL: string;
  readonly VITE_PAGES_BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
