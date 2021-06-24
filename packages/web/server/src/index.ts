import { config } from 'dotenv';
import { join } from 'path';
import ms from 'pretty-ms';
import next from 'next';
import * as log from '@oasis-sh/shared';
import { exit } from '@oasis-sh/shared';
import { getServer } from './getServer';

config({ path: join(__dirname, '../../../api/.env') });

if (Boolean(process.env.STAGING_API) === true) {
  config({ path: join(__dirname, '../../.env') });
}

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: require('../../next.config.js') });
const handle = app.getRequestHandler();
const start = Date.now();

(async () => {
  const server = await getServer();
  const PORT = Number(process.env.PORT) || 3000;

  if (!server) {
    exit(1);
  }

  server.all('*', (req, res) => {
    return handle(req, res as any);
  });

  app.prepare().then(() => {
    try {
      server.listen(PORT, (err?: any) => {
        if (err) throw err;
        log.ready(
          `ready in ${ms(Date.now() - start)} on http://localhost:${PORT}`
        );
      });
    } catch (err) {
      log.error(err);
    }
  });
})();
