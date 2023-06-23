import { UserService } from 'servers/auth-server/src/user/services/user.service';
import { AuthDto, SignUpDto } from '@projecthermes/core/dto/';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import JwtUtil from '@projecthermes/core/server-libs/jwt/jwt.util';
import { UserEntity } from '@projecthermes/authserver/user/entities/user.entity';

@Injectable()
export class AuthService {
  private googleOauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_AUTH_CLIENT_SECRET,
    process.env.GOOGLE_AUTH_REDIRECT_URI,
  );
  constructor(
    private readonly userService: UserService,
    private readonly jwtUtil: JwtUtil,
  ) {}

  async handleSuccessfulGoogleAuth(code: string) {
    const { tokens } = await this.googleOauth2Client.getToken(code);
    this.googleOauth2Client.setCredentials(tokens);
    const {
      data: { email },
    } = await google
      .oauth2({
        version: 'v2',
        auth: this.googleOauth2Client,
      })
      .userinfo.get();
    return this.authenticateUser(email);
  }

  async authenticateUser(email: string) {
    let user: UserEntity = null;
    const userExists = await this.userService.userExistsBy({
      where: {
        email,
      },
    });
    if (userExists) {
      user = await this.userService.findOneUserBy({
        where: {
          email,
        },
      });
    } else {
      user = await this.userService.createUser({
        email,
        authProvider: 'GOOGLE',
      });
    }
    return new AuthDto({
      email,
      accessToken: this.jwtUtil.generateRefreshToken(user).refreshToken,
      refreshToken: this.jwtUtil.generateJwt(user),
    });
  }

  generateGoogleAuthUrl() {
    return this.googleOauth2Client.generateAuthUrl({
      scope: ['email'],
      include_granted_scopes: true,
    });
  }
}
