/**
 * Fixed admin credentials.
 * Hash is bcrypt of "admin" with 10 rounds.
 * Generated with: bcrypt.hashSync('admin', 10)
 */
export const ADMIN_USERNAME = "admin" as const;
export const ADMIN_PASSWORD_HASH = "$2b$10$dJv3VyzrwZdvdhXqWZbGDuNulw/2vtDwKYzBWUGJzTtBH4CI7atVC";

export interface AdminJwtPayload {
  sub: "admin";
  role: "admin";
}
