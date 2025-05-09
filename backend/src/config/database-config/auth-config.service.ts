import { Injectable } from '@nestjs/common';
import { AuthConfig } from '../models';
import * as process from 'node:process';

@Injectable()
export class AuthConfigService {
  get authConfig(): AuthConfig {
    return {
      privateKeyPath: process.env.AUTH_PRIVATE_KEY_PATH!!,
      publicKeyPath: process.env.AUTH_PUBLIC_KEY_PATH!!,
      jwtExpiresIn: process.env.AUTH_PRIVATE_JWT_EXPIRES_IN,
      refreshTokenExpiresIn: process.env.AUTH_REFRESH_TOKEN_IN, // month
    };
  }
}
