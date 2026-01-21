import { Expose, Transform } from 'class-transformer';
import { UserEntity } from '../../../database/entities';

export class CurrentUserResponseDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  @Transform(({ obj }) => {
    const roles = obj.roles || [];
    const allPermissions = roles.flatMap((role) => role.permissions || []);
    return allPermissions.map((permission) => {
      const [action, resource] = permission.action.trim().split('@');
      return {
        action,
        resource
      }
    })
  })
  permissions: { action: string; resource: string }[];
  constructor(params?: Partial<UserEntity>) {
    Object.assign(this, params);
  }
}