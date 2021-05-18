// Copy this file into "ormconfig.ts" in this same directory
// You can change the TypeORM connection options here
import { ConnectionOptions } from 'typeorm';
import { joinRoot } from '@utils/common/rootPath';

// SQLite (simple flat file storage intended for development instances)
export const ormconfig: ConnectionOptions = {
  type: 'sqlite',
  /* Be sure to change this to the location you'd like the sqlite file to be saved. */
  database: './db.sqlite',
  entities: [joinRoot('./entities/*.*')],
  synchronize: true,
};

// PostgreSQL (high performance relational database intended for production instances)

// export const ormconfig: ConnectionOptions = {
//   type: "postgres",
//   host: "localhost",
//   username: "oasis",
//   password: "oasis",
//   uuidExtension: "uuid-ossp",
//   entities: [joinRoot("./entities/*.*")],
//   migrations: [joinRoot("./migrations/*.*")]
// };

export default ormconfig;
