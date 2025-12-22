import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../common/guard';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from '../../config/database-config/auth-config.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[AuthModule]
})
export class UserModule {
}
