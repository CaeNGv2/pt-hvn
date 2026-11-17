import { createContext, useContext } from "react";

import type { UserRole } from "@/lib/jwt";

export interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  /** Role decoded from the JWT ("member" | "admin"), or null for guests. */
  role: UserRole | null;
  isAdmin: boolean;
  /** Persist a freshly issued JWT. */
  login: (token: string) => void;
  /** Clear the stored JWT. */
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Usage:
 *   const { isAuthenticated, isAdmin, login, logout } = useAuth();
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>.");
  }
  return ctx;
}
