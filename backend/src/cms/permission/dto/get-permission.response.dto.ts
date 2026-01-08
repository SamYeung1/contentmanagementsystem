import { Expose, Type } from 'class-transformer';
import { PermissionEntity } from '../../../database/entities';
import { GetAuthorResponseDto } from '../../../common/dto';

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
  @Type(() => GetAuthorResponseDto)
  createdBy: GetAuthorResponseDto;
  @Expose()
  @Type(() => GetAuthorResponseDto)
  updatedBy: GetAuthorResponseDto;

  constructor(params?: Partial<PermissionEntity>) {
    Object.assign(this, params);
  }
}