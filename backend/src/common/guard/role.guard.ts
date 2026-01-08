import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '../../database/entities';
import { IS_PUBLIC_KEY } from '../decorator';
import { META_KEY, Role } from '../decorator/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const PERMISSION_REGEX = /^(CREATE|UPDATE|DELETE|READ|\*)@([a-zA-Z0-9]+)$/;
    const ACTION_MAP: Record<string, string> = {
      'CREATE': 'POST',
      'UPDATE': 'PUT',
      'DELETE': 'DELETE',
      'READ': 'GET',
    };
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;
    const roleResource = Reflect.getMetadata(META_KEY, context.getClass());
    const request = context.switchToHttp().getRequest<Request & { user?: UserEntity }>();
    const currentUser = request?.user as UserEntity;
    if(currentUser.isRootUser) return true;
    const permissions = currentUser.roles.flatMap(
      (role) => role.permissions.map((permission) => {
        const match = PERMISSION_REGEX.exec(permission.action);
        if (!match) return null;
        const [_, rawAction, resource] = match;
        if ((ACTION_MAP[rawAction] === request.method || rawAction === '*') && resource === roleResource)
          return true;
      })).filter(Boolean);
    return permissions.length > 0;
  }
}
