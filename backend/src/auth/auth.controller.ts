import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { AdminLoginDto, MemberLoginDto, AuthTokenResponse } from './auth.dto.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** POST /auth/member/login */
  @Post('member/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Member login – returns JWT' })
  @ApiOkResponse({ type: AuthTokenResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  memberLogin(@Body() dto: MemberLoginDto): Promise<AuthTokenResponse> {
    return this.authService.loginMember(dto.email, dto.password);
  }

  /** POST /auth/admin/login */
  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login – returns JWT' })
  @ApiOkResponse({ type: AuthTokenResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  adminLogin(@Body() dto: AdminLoginDto): Promise<AuthTokenResponse> {
    return this.authService.loginAdmin(dto.username, dto.password);
  }
}
