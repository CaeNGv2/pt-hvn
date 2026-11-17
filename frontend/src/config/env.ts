//Centralised compile time env management (warning do not import to outside of src world)


function requiredOrDefault(name: keyof ImportMetaEnv, fallback?: string): string {
  const value = import.meta.env[name] ?? fallback;
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". Add it to your .env file (see .env.example).`
    );
  }
  return value;
}

function sanitiseBaseUri(value: string) {
  // Trim a trailing slash so callers can safely do `${baseUrl}/path`.
  return value.replace(/\/+$/, "");
}

export const env = {
  /** Base URL of the backend REST API (no trailing slash). */
  apiBaseUrl: sanitiseBaseUri(requiredOrDefault("VITE_API_BASE_URL", "https://pt-hvn-api.uow.itsme.cnz.one")),
  pagesBasePath: requiredOrDefault("VITE_PAGES_BASE_PATH", "/"), // `/pt-hvn/website` for GHA
  /** True when running `vite` in dev mode. */
  isDev: import.meta.env.DEV,
  /** True in a production build. */
  isProd: import.meta.env.PROD,
} as const;
