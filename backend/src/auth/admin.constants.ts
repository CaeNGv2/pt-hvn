/**
 * Fixed admin credentials.
 * Hash is bcrypt of "admin" with 10 rounds.
 * Generated with: bcrypt.hashSync('admin', 10)
 */
export const ADMIN_USERNAME = 'admin' as const;
export const ADMIN_PASSWORD_HASH =
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

export interface AdminJwtPayload {
  sub: 'admin';
  role: 'admin';
}
