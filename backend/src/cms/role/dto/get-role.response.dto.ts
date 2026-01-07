import { Expose, Type } from 'class-transformer';
import { RoleEntity } from '../../../database/entities';
import { GetUserResponseDto } from '../../user/dto';
import { GetPermissionResponseDto } from '../../permission/dto';

export class GetRoleResponseDto {
  @Expose()
  id: string;
  @Expose()
  action: string;
  @Expose()
  name: string;
  @Expose()
  @Type(() => GetPermissionResponseDto)
  permissions:GetPermissionResponseDto[];
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

  constructor(params?: Partial<RoleEntity>) {
    Object.assign(this, params);
  }
}