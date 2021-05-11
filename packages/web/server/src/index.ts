import { config } from 'dotenv';
import { join } from 'path';
import next from 'next';
import { createApp } from '@oasis/api';
import { chalkLog } from './lib/chalkLog';
import { ExitWithErrors } from './lib/ExitWithErrors'

config({ path: join(__dirname, '../../../api/.env') });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: require('../../next.config.js') });
const handle = app.getRequestHandler();

(async () => {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    console.error(`${chalkLog('error',`error`)} - You must have NEXT_PUBLIC_BASE_URL set in your .env file.`)
    ExitWithErrors(1)
    process.exit(1);
  }

  const server = await createApp();
  if (!server) {
    console.error('> Uh oh, we ran into some errors.');
    process.exit(1);
  }

  app.prepare().then(() => {
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    const PORT = parseInt(process.env.PORT as string, 10) || 3000;

    try {
      server.listen(PORT, () =>
        console.error(
          `${chalkLog(
            'success',
            `success`
          )} - Ready on http://localhost:${PORT} \n${chalkLog(
            'success',
            `success`
          )} - API: http://localhost:${PORT}/graphql`
        )
      );
    } catch (err) {
      if (err) throw err;
    }
  });
})();
