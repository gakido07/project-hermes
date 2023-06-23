import { Module } from '@nestjs/common';
import { UserService } from '@projecthermes/authserver/user/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@projecthermes/authserver/user/entities/user.entity';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
