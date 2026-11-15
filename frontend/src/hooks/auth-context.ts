import { createContext, useContext } from "react";

export interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  /** Persist a freshly issued JWT. */
  login: (token: string) => void;
  /** Clear the stored JWT. */
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Usage:
 *   const { isAuthenticated, login, logout } = useAuth();
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>.");
  }
  return ctx;
}
