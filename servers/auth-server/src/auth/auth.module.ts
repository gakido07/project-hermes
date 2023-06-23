import { Module } from '@nestjs/common';
import { AuthService } from '@projecthermes/authserver/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@projecthermes/authserver/user/user.module';
import { JwtStrategy } from '@projecthermes/common/strategies/jwt.strategy';
import JwtUtil from '@projecthermes/core/server-libs/jwt/jwt.util';
import { AuthController } from '@projecthermes/authserver/auth/auth.controller';
import * as process from 'process';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      signOptions: {
        issuer: 'Project-Hermes',
        header: { alg: 'HS256', typ: 'JWT' },
      },
      secretOrPrivateKey: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtUtil],
  exports: [AuthService, JwtUtil],
  controllers: [AuthController],
})
export class AuthModule {}
