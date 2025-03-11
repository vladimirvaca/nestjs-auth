import * as dotenv from 'dotenv';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

dotenv.config();

export const databaseConfig: SequelizeModuleOptions = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  dialect: 'postgres',
};
