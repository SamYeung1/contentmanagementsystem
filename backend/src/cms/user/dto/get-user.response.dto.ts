import { Expose, Type } from 'class-transformer';
import { UserEntity } from '../../../database/entities';
import { GetRoleResponseDto } from '../../role/dto';
import { GetAuthorResponseDto } from '../../../common/dto';

export class GetUserResponseDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  @Type(() => GetRoleResponseDto)
  roles: GetRoleResponseDto[];
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  @Type(() => GetAuthorResponseDto)
  createdBy: GetAuthorResponseDto;
  @Expose()
  @Type(() => GetAuthorResponseDto)
  updatedBy: GetAuthorResponseDto;

  constructor(params?: Partial<UserEntity>) {
    Object.assign(this, params);
  }
}