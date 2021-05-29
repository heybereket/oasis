import { ConnectionOptions } from 'typeorm';
import { joinRoot } from './utils/common/rootPath';

export const ormconfig: ConnectionOptions = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  uuidExtension: 'uuid-ossp',
  entities: [joinRoot('./entities/*.*')],
  migrations: [joinRoot('./migrations/*.*')],
};

export default ormconfig;
