import { createConnection } from 'typeorm';
import { ormconfig } from '../ormconfig';

export const testConn = (drop: boolean = false) =>
  createConnection({
    // Use the same ormconfig but add "-test" to the database name
    ...ormconfig,
    database:
      typeof ormconfig.database === 'string'
        ? ormconfig.database + '-test'
        : (ormconfig.database as any),

    // These values are overwritten as they should have behave differently in a test environment
    synchronize: drop,
    dropSchema: drop,
  });
