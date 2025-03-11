import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './database.config';

export const DatabaseModule = SequelizeModule.forRoot({
  ...databaseConfig,
  autoLoadModels: true,
  synchronize: true,
});
