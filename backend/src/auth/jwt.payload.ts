export interface MemberJwtPayload {
  sub: number;   // member id
  email: string;
  role: 'member';
}

export interface AdminJwtPayload {
  sub: 'admin';
  role: 'admin';
}

export type JwtPayload = MemberJwtPayload | AdminJwtPayload;
