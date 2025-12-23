import { Expose, Type } from 'class-transformer';
import { UserEntity } from '../../../database/entities';
import { GetPermissionResponseDto } from './get-permission.response.dto';

export class CreatePermissionResponseDto {
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
  @Type(() => GetPermissionResponseDto)
  createdBy: GetPermissionResponseDto;
  @Expose()
  @Type(() => GetPermissionResponseDto)
  updatedBy: GetPermissionResponseDto;

  constructor(params?: Partial<UserEntity>) {
    Object.assign(this, params);
  }
}