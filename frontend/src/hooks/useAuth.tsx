import { useCallback, useMemo, useState, type ReactNode } from "react";

import { getAuthToken, setAuthToken } from "@/api";
import { AuthContext, type AuthContextValue } from "@/hooks/auth-context";
import { isTokenValid } from "@/lib/jwt";

function initialToken(scope: "member" | "admin"): string | null {
  const stored = getAuthToken(scope);
  if (stored && !isTokenValid(stored)) {
    setAuthToken(scope, null);
    return null;
  }
  return stored;
}

/**
 * Holds two independent sessions (member + admin), so logging into one does
 * not affect the other.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [memberToken, setMemberToken] = useState<string | null>(() =>
    initialToken("member")
  );
  const [adminToken, setAdminToken] = useState<string | null>(() =>
    initialToken("admin")
  );

  const loginMember = useCallback((t: string) => {
    setAuthToken("member", t);
    setMemberToken(t);
  }, []);
  const logoutMember = useCallback(() => {
    setAuthToken("member", null);
    setMemberToken(null);
  }, []);
  const loginAdmin = useCallback((t: string) => {
    setAuthToken("admin", t);
    setAdminToken(t);
  }, []);
  const logoutAdmin = useCallback(() => {
    setAuthToken("admin", null);
    setAdminToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      memberToken,
      isMemberAuthenticated: Boolean(memberToken),
      loginMember,
      logoutMember,
      adminToken,
      isAdmin: Boolean(adminToken),
      loginAdmin,
      logoutAdmin,
    }),
    [memberToken, adminToken, loginMember, logoutMember, loginAdmin, logoutAdmin]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
