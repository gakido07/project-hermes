import { Injectable } from '@nestjs/common';
import { SignUpDto } from '@projecthermes/core/dto';
import { UserEntity } from 'servers/auth-server/src/user/entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser({ email, authProvider }: SignUpDto) {
    const newUser = this.userRepository.create({
      email,
      authProvider,
    });
    return this.userRepository.save(newUser);
  }

  async userExistsBy(options: FindManyOptions<UserEntity>) {
    return this.userRepository.exist(options);
  }

  async findOneUserBy(options: FindManyOptions<UserEntity>) {
    return this.userRepository.findOne(options);
  }
}
