import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import JwtUtil from '@projecthermes/core/server-libs/jwt/jwt.util';
import { CustomRequestContext } from '@projecthermes/common/types';
import { extractTokenFromAuthHeader } from '@projecthermes/common/util';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private jwtUtil: JwtUtil) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.AccessToken,
      ]),
      passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(request: CustomRequestContext, payload: jwt.JwtPayload) {
    const token = request.cookies.AccessToken;
    request.claims = this.jwtUtil.extractAllClaimsFromToken(token);
    return { id: payload.sub, email: payload.email };
  }
}
