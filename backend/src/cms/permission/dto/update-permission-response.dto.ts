import { Expose, Type } from 'class-transformer';
import { PermissionEntity, UserEntity } from '../../../database/entities';
import { GetUserResponseDto } from '../../user/dto';

export class UpdatePermissionResponseDto {
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
  @Type(() => GetUserResponseDto)
  createdBy: GetUserResponseDto;
  @Expose()
  @Type(() => GetUserResponseDto)
  updatedBy: GetUserResponseDto;

  constructor(params?: Partial<PermissionEntity>) {
    Object.assign(this, params);
  }
}