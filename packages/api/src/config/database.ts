import { ConnectionOptions, createConnection } from 'typeorm';
import { joinRoot } from '@utils/common/rootPath';
import { seedDatabase } from '@utils/testing/seedDatabase';
import * as log from '@oasis-sh/shared';

export const getDatabase = async () => {
  let ormconfig: ConnectionOptions;

  if (process.env.TESTING === 'true') {
    seedDatabase();
    ormconfig = {
      type: 'sqlite',
      database: 'testing.sqlite',
      entities: [joinRoot('./entities/*.*')],
      synchronize: true,
    };
  } else {
    ormconfig = require('@root/ormconfig').default;
  }

  try {
    await createConnection(ormconfig);
    log.event(`successfully connected to ${ormconfig.type} database`);
  } catch (err) {
    log.error(`failed to connect to database: ${err}`);
  }
};
