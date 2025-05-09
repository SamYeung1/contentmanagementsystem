import { Global, Module } from '@nestjs/common';
import { DatabaseConfigService } from './database-config/database-config.service';
import { AuthConfigService } from './database-config/auth-config.service';

@Global()
@Module({
  providers: [DatabaseConfigService, AuthConfigService],
  exports: [DatabaseConfigService, AuthConfigService],
})
export class ConfigModule {
}
