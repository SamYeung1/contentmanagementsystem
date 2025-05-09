import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './cms/user/user.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './common/middleware';
import { AuthModule } from './cms/auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
