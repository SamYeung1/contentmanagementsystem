import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './cms/user/user.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './common/middleware';
import { AuthModule } from './cms/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PermissionModule } from './cms/permission/permission.module';
import { RoleModule } from './cms/role/role.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard,RoleGuard } from './common/guard';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    ConfigModule.forRoot(),
  ],
  providers:[{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },{
    provide: APP_GUARD,
    useClass: RoleGuard,
  }],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
