import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';

export class MemberLoginDto {
  email: string = '';
  password: string = '';
}

export class AdminLoginDto {
  username: string = 'admin';
  password: string = '';
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** POST /auth/member/login */
  @Post('member/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Member login – returns JWT' })
  memberLogin(@Body() dto: MemberLoginDto) {
    return this.authService.loginMember(dto.email, dto.password);
  }

  /** POST /auth/admin/login */
  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login – returns JWT' })
  adminLogin(@Body() dto: AdminLoginDto) {
    return this.authService.loginAdmin(dto.username, dto.password);
  }
}
