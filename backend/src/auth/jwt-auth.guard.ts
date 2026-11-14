import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Requires any valid JWT (member or admin). */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
