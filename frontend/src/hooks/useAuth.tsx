import { useCallback, useMemo, useState, type ReactNode } from "react";

import { getAuthToken, setAuthToken } from "@/api";
import { AuthContext, type AuthContextValue } from "@/hooks/auth-context";

/**
 * Minimal auth state shared across the app. Wrap the router in <AuthProvider>.
 * This is a scaffold — role handling (member vs admin) can be layered on later
 * by decoding the JWT payload.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getAuthToken());

  const login = useCallback((next: string) => {
    setAuthToken(next);
    setToken(next);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ token, isAuthenticated: Boolean(token), login, logout }),
    [token, login, logout]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
