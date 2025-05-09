import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthConfigService } from '../../config/database-config/auth-config.service';
import * as fs from 'fs';

@Module({
  imports: [JwtModule.registerAsync({
    inject: [AuthConfigService],
    useFactory: (configService: AuthConfigService): JwtModuleOptions => ({
      privateKey: fs.readFileSync(configService.authConfig.privateKeyPath),
      publicKey: fs.readFileSync(configService.authConfig.publicKeyPath),
      signOptions: {
        algorithm: 'RS256',
        issuer: 'content_management_system',
        expiresIn: configService.authConfig.jwtExpiresIn + 'h',
      },
    }),
  })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
}
