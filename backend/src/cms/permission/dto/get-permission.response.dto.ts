import { Expose, Type } from 'class-transformer';
import { UserEntity } from '../../../database/entities';

export class GetPermissionResponseDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  isDeleted: boolean;
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