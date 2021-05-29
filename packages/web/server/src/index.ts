import { config } from 'dotenv';
import path, { join } from 'path';
import ms from 'pretty-ms';
import next from 'next';
import * as log from './lib/log';
import { exit } from './lib/exit';
import { getServer } from './lib/getServer';

config({ path: join(__dirname, '../../.env') });

if (process.env.API_MODE === 'local') {
  config({ path: join(__dirname, '../../../api/.env') });
}

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: require('../../next.config.js') });
const handle = app.getRequestHandler();

const start = Date.now();

(async () => {
  const server = await getServer(process.env.API_MODE as string);

  if (!server) {
    exit(1);
  }

  app.prepare().then(() => {
    if (process.env.NODE_ENV === 'production') {
      server.get('/service-worker.js', function (req, res) {
        res.sendFile(
          path.resolve(__dirname, '../../.next', 'service-worker.js')
        );
      });
    }

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    const PORT = parseInt(process.env.PORT as string, 10) || 3000;

    try {
      server.listen(PORT, () =>
        log.ready(
          `Ready in ${ms(Date.now() - start)} on http://localhost:${PORT}`
        )
      );
    } catch (err) {
      if (err) throw err;
    }
  });
})();
