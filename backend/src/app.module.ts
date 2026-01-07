import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './cms/user/user.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './common/middleware';
import { AuthModule } from './cms/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PermissionModule } from './cms/permission/permission.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    PermissionModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
