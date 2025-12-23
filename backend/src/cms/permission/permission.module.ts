import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [PermissionService],
  controllers: [PermissionController],
  imports:[AuthModule]
})
export class PermissionModule {
}
