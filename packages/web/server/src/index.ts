import { config } from 'dotenv';
import { join } from 'path';
import next from 'next';
import { createApp } from '@oasis-sh/api';
import { chalkLog } from './lib/chalkLog';
import { ExitWithErrors } from './lib/ExitWithErrors';
import { getServer } from './lib/getServer';

config({ path: join(__dirname, '../../.env') });

process.env.API_MODE == 'local' &&
  config({ path: join(__dirname, '../../../api/.env') });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: require('../../next.config.js') });
const handle = app.getRequestHandler();

const time = Date.now();

(async () => {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    chalkLog('error', `NEXT_PUBLIC_BASE_URL is undefined in packages/web/.env`);
    ExitWithErrors(1);
  }

  const server = await getServer();

  if (!server) {
    ExitWithErrors(1);
  }

  app.prepare().then(() => {
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    const PORT = parseInt(process.env.PORT as string, 10) || 3000;

    try {
      server.listen(PORT, () =>
        chalkLog(
          'success',
          `Ready in ${Date.now() - time}ms on http://localhost:${PORT}`
        )
      );
    } catch (err) {
      if (err) throw err;
    }
  });
})();
