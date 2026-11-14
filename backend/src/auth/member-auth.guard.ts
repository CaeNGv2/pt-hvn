import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import type { JwtPayload } from './jwt.payload.js';

/** Requires JWT whose payload has role === 'member'. */
@Injectable()
export class MemberAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
    const user = request.user;
    if (!user || user.role !== 'member') {
      throw new UnauthorizedException('Member access required');
    }
    return true;
  }
}
