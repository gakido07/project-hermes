import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import JwtUtil from '@projecthermes/core/server-libs/jwt/jwt.util';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'servers/common/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector, private jwtUtil: JwtUtil) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request: Request = context.getArgByIndex(0);
    let token: string = null;

    try {
      token = request?.cookies?.AccessToken;
    } catch (error) {
      this.logger.error('Unable to extract jwt for request');
      throw new UnauthorizedException('Unauthorized');
    }

    return super.canActivate(context);
  }
}
