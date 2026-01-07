import { Expose, Type } from 'class-transformer';
import { PermissionEntity, UserEntity } from '../../../database/entities';

export class GetPermissionResponseDto {
  @Expose()
  id: string;
  @Expose()
  action: string;
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

  constructor(params?: Partial<PermissionEntity>) {
    Object.assign(this, params);
  }
}