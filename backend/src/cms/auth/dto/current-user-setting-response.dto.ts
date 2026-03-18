import { Expose, Type } from 'class-transformer';
import { GetRoleResponseDto } from '../../role/dto';

export class CurrentUserSettingResponseDto{
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  @Type(() => GetRoleResponseDto)
  roles: GetRoleResponseDto[];
}