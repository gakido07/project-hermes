import { AUTH_PROVIDER } from '@projecthermes/core/types';

export class SignUpDto {
  email: string;
  authProvider: AUTH_PROVIDER;
}
