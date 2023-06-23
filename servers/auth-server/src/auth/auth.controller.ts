import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from '@projecthermes/authserver/auth/auth.service';
import { Response } from 'express';
import { Public } from '@projecthermes/common/decorators/public.decorator';

@Controller('/auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  authenticateWithGoogle(@Res() response: Response) {
    response.redirect(this.authService.generateGoogleAuthUrl());
  }

  @Get('google/register')
  async handleSuccessfulGoogleAuth(
    @Query('code') code: string,
    @Res() response: Response,
  ) {
    const { email, refreshToken, accessToken } =
      await this.authService.handleSuccessfulGoogleAuth(code);
    response.cookie('AccessToken', accessToken);
    response.cookie('RefreshToken', refreshToken);
    return response.status(200).json({
      email,
    });
  }

  @Get('/google/register/dev')
  async devAuthentication(@Res() response: Response) {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'development') return;
    const { email, refreshToken, accessToken } =
      await this.authService.authenticateUser('daniel.ekara.dev@gmail.com');
    response.cookie('AccessToken', accessToken);
    response.cookie('RefreshToken', refreshToken);
    return response.status(200).json({
      email,
    });
  }
}
