import { UserModel } from '@projecthermes/core/models';
import { Base } from '@projecthermes/core/interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AUTH_PROVIDER } from '@projecthermes/core';

@Entity()
export class UserEntity implements UserModel, Base {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ name: 'auth_provider' })
  authProvider: AUTH_PROVIDER;

  refreshTokenIds: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export type UserEntityConstructorParams = {
  name: string;
  email: string;
  authProvider: AUTH_PROVIDER;
};
