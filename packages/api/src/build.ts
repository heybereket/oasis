import 'reflect-metadata';
import { getSchema } from '@utils/files/getSchema';
import * as log from '@lib/log';
import { exit } from '@lib/exit';

try {
  getSchema();
  log.event('successfully compiled api');
  process.exit();
} catch(err) {
  log.error(`failed to compile api: ${err}`);
  exit(1);
}
