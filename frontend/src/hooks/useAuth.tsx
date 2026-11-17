import { useCallback, useMemo, useState, type ReactNode } from "react";

import { getAuthToken, setAuthToken } from "@/api";
import { AuthContext, type AuthContextValue } from "@/hooks/auth-context";
import { decodeJwt, isTokenValid } from "@/lib/jwt";

/**
 * Auth state shared across the app. Wrap the router in <AuthProvider>.
 * The role is decoded from the JWT so the UI can gate admin-only areas.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const stored = getAuthToken();
    // Drop an expired/garbage token on load.
    if (stored && !isTokenValid(stored)) {
      setAuthToken(null);
      return null;
    }
    return stored;
  });

  const login = useCallback((next: string) => {
    setAuthToken(next);
    setToken(next);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const role = decodeJwt(token)?.role ?? null;
    return {
      token,
      isAuthenticated: Boolean(token),
      role,
      isAdmin: role === "admin",
      login,
      logout,
    };
  }, [token, login, logout]);

  return <AuthContext value={value}>{children}</AuthContext>;
}
