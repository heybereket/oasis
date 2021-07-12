import { ConnectionOptions, createConnection } from 'typeorm';
import { joinRoot } from '../utils/rootPath';
import * as log from '../utils/output/log';

export const getDatabase = async () => {
  let ormconfig: ConnectionOptions;

  if (process.env.TESTING === 'true') {
    ormconfig = {
      type: 'sqlite',
      database: 'testing.sqlite',
      entities: [joinRoot('./entities/*.*')],
      synchronize: true,
    };
  } else {
    ormconfig = require('../ormconfig').default;
  }

  try {
    await createConnection(ormconfig);
    log.event(`successfully connected to ${ormconfig.type} database`);
  } catch (err) {
    log.error(`failed to connect to database: ${err}`);
  }
};
