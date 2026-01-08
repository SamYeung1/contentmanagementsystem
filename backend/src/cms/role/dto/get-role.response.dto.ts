import { Expose, Type } from 'class-transformer';
import { RoleEntity } from '../../../database/entities';
import { GetPermissionResponseDto } from '../../permission/dto';
import { GetAuthorResponseDto } from '../../../common/dto';

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
  @Type(() => GetAuthorResponseDto)
  createdBy: GetAuthorResponseDto;
  @Expose()
  @Type(() => GetAuthorResponseDto)
  updatedBy: GetAuthorResponseDto;

  constructor(params?: Partial<RoleEntity>) {
    Object.assign(this, params);
  }
}