
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['src/entities/*.entity.{js,ts}'],
    migrations: ['src/migrations/*.{js,ts}'],
    migrationsTableName: 'migrations',
    synchronize: false,
    migrationsRun: true,
    autoLoadEntities: true,
    logging: true,
};




