import { AUTH_PROVIDER } from '@projecthermes/core';

export interface UserModel {
  name: string;
  email: string;
  authProvider: AUTH_PROVIDER;
  refreshTokenIds: string[];
}
