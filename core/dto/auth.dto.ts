export class AuthDto {
  email: string;
  accessToken: string;
  refreshToken: string;

  constructor({ email, accessToken, refreshToken }: AuthDtoConstructorParams) {
    this.email = email;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

type AuthDtoConstructorParams = {
  email: string;
  accessToken: string;
  refreshToken: string;
};
