import { UserEntity } from 'servers/auth-server/src/user/entities/user.entity';

export class Claims {
  sub: string;
  email: string;
  role: string;
  jti?: string;

  constructor(appUser: UserEntity) {
    this.sub = appUser.id.toString();
    this.email = appUser.email;
    this.role = null;
  }
}
