import { config } from 'dotenv';
import { join } from 'path';
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { chalkLog } from './lib/chalkLog';
import { exit } from './lib/exit';
import { getServer } from './lib/getServer';

config({ path: join(__dirname, '../../.env') });

// default to running api locally

if (process.env.API_MODE === 'local') {
  config({ path: join(__dirname, '../../../api/.env') });
}

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: require('../../next.config.js') });
const handle = app.getRequestHandler();

const time = Date.now();

(async () => {
  const server = await getServer(process.env.API_MODE as string);

  if (!server) {
    exit(1);
  }

  app.prepare().then(() => {
     createServer((req, res) => {
       const parsedUrl = parse(req.url, true);
       const { pathname } = parsedUrl;

       if (
         pathname === '/sw.js' ||
         /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)
       ) {
         const filePath = join(__dirname, '.next', pathname);
         app.serveStatic(req, res, filePath);
       } else {
         handle(req, res, parsedUrl);
       }
     });
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
