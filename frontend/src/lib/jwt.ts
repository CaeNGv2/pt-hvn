/** Roles encoded in our JWTs (see backend jwt.payload.ts). */
export type UserRole = "member" | "admin";

interface JwtClaims {
  role?: UserRole;
  sub?: string | number;
  email?: string;
  exp?: number;
}

/** Decode a JWT payload (no signature verification — client display only). */
export function decodeJwt(token: string | null | undefined): JwtClaims | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(payload);
    return JSON.parse(json) as JwtClaims;
  } catch {
    return null;
  }
}

/** True when the token is present and not past its `exp`. */
export function isTokenValid(token: string | null | undefined): boolean {
  const claims = decodeJwt(token);
  if (!claims) return false;
  if (claims.exp && claims.exp * 1000 < Date.now()) return false;
  return true;
}
