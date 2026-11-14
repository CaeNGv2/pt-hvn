import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/member.entity.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtStrategy } from './jwt.strategy.js';
import { getJwtConfig } from '../config/jwt.config.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        const { secret, expiresIn } = getJwtConfig();
        return { secret, signOptions: { expiresIn: expiresIn as `${number}${'s'|'m'|'h'|'d'}` } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
