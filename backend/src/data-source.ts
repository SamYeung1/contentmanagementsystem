import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PermissionEntity, RoleEntity, UserAuthEntity, UserEntity } from './database/entities';
import { DatabaseConfigService } from './config/database-config/database-config.service';

const databaseConfigService: DatabaseConfigService = new DatabaseConfigService();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: databaseConfigService.databaseConfig.host,
  port: databaseConfigService.databaseConfig.port,
  username: databaseConfigService.databaseConfig.username,
  password: databaseConfigService.databaseConfig.password,
  database: databaseConfigService.databaseConfig.database,
  synchronize: true,
  logging: false,
  entities: [UserEntity, UserAuthEntity, PermissionEntity, RoleEntity],
  migrations: [],
  subscribers: [],
});
// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: '127.0.0.1',
//   port: 5001,
//   username: 'samyeung',
//   password: 'samyeung',
//   database: 'cms',
//   synchronize: true,
//   logging: false,
//   entities: [UserEntity, UserAuthEntity, PermissionEntity, RoleEntity],
//   migrations: [],
//   subscribers: [],
// });
