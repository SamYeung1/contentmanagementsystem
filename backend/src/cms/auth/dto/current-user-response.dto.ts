import { Expose, Type } from 'class-transformer';
import { UserEntity } from '../../../database/entities';
import { GetRoleResponseDto } from '../../role/dto';

export class CurrentUserResponseDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  @Type(() => GetRoleResponseDto)
  roles: GetRoleResponseDto[];

  constructor(params?: Partial<UserEntity>) {
    Object.assign(this, params);
  }
}