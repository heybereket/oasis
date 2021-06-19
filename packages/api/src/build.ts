import 'reflect-metadata';
import { createSchema } from '@utils/files/createSchema';
import * as log from '@lib/log';
import { exit } from '@lib/exit';

try {
  createSchema();
  log.event('successfully compiled api');
  process.exit();
} catch (err) {
  log.error(`failed to compile api: ${err}`);
  exit(1);
}
