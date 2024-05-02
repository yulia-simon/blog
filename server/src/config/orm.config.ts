

import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from './typeorm';


const config: DataSourceOptions = typeOrmConfig as DataSourceOptions

export const connectionSource = new DataSource(config);
