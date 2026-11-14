import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import type { JwtPayload } from './jwt.payload.js';

/** Requires JWT whose payload has role === 'admin'. */
@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
    const user = request.user;
    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException('Admin access required');
    }
    return true;
  }
}
