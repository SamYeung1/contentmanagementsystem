import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from '../models';
import * as process from 'node:process';

@Injectable()
export class DatabaseConfigService {
  get databaseConfig(): DatabaseConfig {
    return {
      host: process.env.DATABASE_HOST!!,
      port: parseInt(process.env.DATABASE_PORT!!),
      username: process.env.DATABASE_USERNAME!!,
      password: process.env.DATABASE_PASSWORD!!,
      database: process.env.DATABASE_DATABASE!!,
    };
  }
}
