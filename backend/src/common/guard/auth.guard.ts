import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from '../../config/database-config/auth-config.service';
import * as fs from 'fs';
import { UserRepository } from '../../database/repositories';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY, Public } from '../decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector:Reflector,private readonly jwtService: JwtService, private readonly authConfigService: AuthConfigService,private readonly userRepository: UserRepository) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if(isPublic) return true;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          publicKey: fs.readFileSync(this.authConfigService.authConfig.publicKeyPath),
        },
      );
      request['user'] = await this.userRepository.findById(payload.sub);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
