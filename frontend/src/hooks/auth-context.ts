import { createContext, useContext } from "react";

export interface AuthContextValue {
  /** Member session */
  memberToken: string | null;
  isMemberAuthenticated: boolean;
  loginMember: (token: string) => void;
  logoutMember: () => void;

  /** Admin session (kept entirely separate from the member session) */
  adminToken: string | null;
  isAdmin: boolean;
  loginAdmin: (token: string) => void;
  logoutAdmin: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Usage:
 *   const { isMemberAuthenticated, loginMember } = useAuth(); // portal
 *   const { isAdmin, loginAdmin } = useAuth();                 // admin
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>.");
  }
  return ctx;
}
