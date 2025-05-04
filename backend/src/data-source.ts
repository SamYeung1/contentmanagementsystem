import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from "./database/entities/user.entity";
import {DatabaseConfigService} from "./config/database-config/database-config.service";

const databaseConfigService:DatabaseConfigService = new DatabaseConfigService();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: databaseConfigService.databaseConfig.host,
    port: databaseConfigService.databaseConfig.port,
    username: databaseConfigService.databaseConfig.username,
    password: databaseConfigService.databaseConfig.password,
    database: databaseConfigService.databaseConfig.database,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
