import { env } from "@/config/env";
import { Api } from "@/api/generated/api";

/** Auth scopes — admin and member sessions are kept fully separate. */
export type AuthScope = "member" | "admin";

const TOKEN_KEYS: Record<AuthScope, string> = {
  member: "pethvn.site.auth_token",
  admin: "pethvn.site.admin_token",
};

export function getAuthToken(scope: AuthScope): string | null {
  return localStorage.getItem(TOKEN_KEYS[scope]);
}

export function setAuthToken(scope: AuthScope, token: string | null): void {
  if (token) localStorage.setItem(TOKEN_KEYS[scope], token);
  else localStorage.removeItem(TOKEN_KEYS[scope]);
}

/**
 * Decide which token a request should carry, based on its path.
 * Admin-only surfaces use the admin token; everything else uses the member one.
 */
function scopeForPath(path: string, method: string): AuthScope {
  const m = method.toUpperCase();
  // Always-admin surfaces.
  if (path.startsWith("/admin") || path.startsWith("/auth/admin")) return "admin";
  if (path === "/members" || /^\/members\/\d+$/.test(path)) return "admin";
  // Admin-only review + single-get on requests.
  if (/^\/(adoptions|releases)\/\d+(\/review)?$/.test(path)) return "admin";
  // GET list of all requests is admin; POST to the same path (create) is member.
  if (m === "GET" && /^\/(adoptions|releases)(\?|$)/.test(path)) return "admin";
  return "member";
}

export const api = new Api({
  baseUrl: env.apiBaseUrl,
  securityWorker: (/* securityData */) => {
    // We don't rely on securityData; resolve per request via customFetch below.
    return {};
  },
  customFetch: (input, init) => {
    const url = typeof input === "string" ? input : input.toString();
    const path = url.startsWith(env.apiBaseUrl)
      ? url.slice(env.apiBaseUrl.length)
      : url;
    const method = init?.method ?? "GET";
    const scope = scopeForPath(path, method);
    const token = getAuthToken(scope);

    const headers = new Headers(init?.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);

    return fetch(input, { ...init, headers });
  },
});
