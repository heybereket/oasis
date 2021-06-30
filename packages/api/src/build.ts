import 'reflect-metadata';
import { createSchema } from '@utils/files/createSchema';
import * as log from '@utils/output/log';
import { exit } from '@utils/output/exit';

try {
  createSchema();
  log.event('successfully compiled api');
  process.exit();
} catch (err) {
  log.error(`failed to compile api: ${err}`);
  exit(1);
}
