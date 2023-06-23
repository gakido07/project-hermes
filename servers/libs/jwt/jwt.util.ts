import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Claims } from '@projecthermes/core/dto/claims.dto';
import { randomUUID } from 'crypto';
import { UserEntity } from 'servers/auth-server/src/user/entities/user.entity';
import jwt from 'jsonwebtoken';

@Injectable()
export default class JwtUtil {
  private readonly logger: Logger = new Logger(JwtUtil.name);

  constructor(private jwtService: JwtService) {}

  generateJwt(appUser: UserEntity, exp?: string): string {
    return this.jwtService.sign(
      { ...new Claims(appUser) },
      { secret: process.env.JWT_SECRET, expiresIn: exp || '10m' },
    );
  }

  generateRefreshToken(appUser: UserEntity): {
    refreshToken: string;
    jti: string;
    exp: Date;
  } {
    const tokenId = randomUUID();
    return {
      refreshToken: this.jwtService.sign(
        { sub: appUser.id },
        {
          secret: process.env.JWT_SECRET,
          jwtid: tokenId,
          expiresIn: '120h',
        },
      ),
      jti: tokenId,
      exp: new Date(new Date().getTime() + 120 * 60 * 60 * 1000),
    };
  }

  decodeJwt(token: string): string | jwt.JwtPayload {
    return this.jwtService.decode(token);
  }

  verifyJwt(token: string): Claims {
    let claims: Claims = null;
    try {
      claims = this.jwtService.verify<Claims>(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        'Error while verifying refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return claims;
  }

  extractClaimFromToken(
    token: string,
    tokenClaim: 'sub' | 'role' | 'email',
  ): string {
    const jwtPayload: string | jwt.JwtPayload = this.decodeJwt(token);
    if (!jwtPayload?.sub) {
      throw new UnauthorizedException('Invalid token');
    }
    const claim: string = jwtPayload[`${tokenClaim}`];
    if (!claim) {
      throw new HttpException(
        'invalid claim',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return claim;
  }

  extractAllClaimsFromToken(token: string): Claims {
    const jwtPayload: string | jwt.JwtPayload = this.decodeJwt(token);
    if (!jwtPayload?.sub) {
      throw new UnauthorizedException('Invalid token');
    }
    return jwtPayload as Claims;
  }
}
