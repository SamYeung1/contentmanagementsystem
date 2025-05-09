import { DynamicModule, Global, Module } from '@nestjs/common';
import { UserRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { DatabaseConfigService } from '../config/database-config/database-config.service';
import { UserAuthEntity, UserEntity } from './entities';
import { UserAuthRepository } from './repositories/user-auth.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (configService: DatabaseConfigService) => ({
        type: 'postgres',
        host: configService.databaseConfig.host,
        port: configService.databaseConfig.port,
        password: configService.databaseConfig.password,
        username: configService.databaseConfig.username,
        entities: [UserEntity, UserAuthEntity],
        database: configService.databaseConfig.database,
        synchronize: true,
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature([UserEntity, UserAuthEntity])],
  providers: [UserRepository, UserAuthRepository],
  exports: [UserRepository, UserAuthRepository],
})
export class DatabaseModule {
}
