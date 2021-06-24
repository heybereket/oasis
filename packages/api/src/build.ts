import 'reflect-metadata';
import { createSchema } from '@utils/files/createSchema';
import { log, exit } from '@oasis-sh/shared';

try {
  createSchema();
  log.event('successfully compiled api');
  process.exit();
} catch (err) {
  log.error(`failed to compile api: ${err}`);
  exit(1);
}
