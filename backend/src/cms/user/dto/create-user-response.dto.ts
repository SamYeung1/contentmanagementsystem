import { Expose, Type } from 'class-transformer';
import { UserEntity } from '../../../database/entities';
import { GetUserResponseDto } from './get-user.response.dto';

export class CreateUserResponseDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  @Type(() => GetUserResponseDto)
  createdBy: GetUserResponseDto;
  @Expose()
  @Type(() => GetUserResponseDto)
  updatedBy: GetUserResponseDto;

  constructor(params?: Partial<UserEntity>) {
    Object.assign(this, params);
  }
}