export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export function getJwtConfig(): JwtConfig {
  return {
    secret: process.env['JWT_SECRET'] ?? 'pethaven-dev-secret-change-in-prod',
    expiresIn: process.env['JWT_EXPIRES_IN'] ?? '7d',
  };
}
