import { env } from "@/config/env";
import { Api } from "@/api/generated/api";

/**
 * Where the JWT is kept between page loads
 */
const TOKEN_STORAGE_KEY = "pethvn.site.auth_token";

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

/**
 * API client.
 *
 * Attaches bearer token to header when security is required by api.
 */
//The `securityWorker` runs for every request flagged `secure: true` in the
// generated client and attaches the bearer token when one is present.
export const api = new Api({
  baseUrl: env.apiBaseUrl,
  securityWorker: () => {
    const token = getAuthToken();
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },
});
