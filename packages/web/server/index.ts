import { config } from 'dotenv';
import { join } from 'path';
import next from 'next';
import { createApp } from '@oasis/api';

config({ path: join(__dirname, '../../api/.env') });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: require('../next.config.js') });
const handle = app.getRequestHandler();

(async () => {
  const server = await createApp();

  app.prepare().then(() => {
    server.all('*', (req, res) => {
      return handle(req, res);
    });

    const PORT = parseInt(process.env.PORT as string, 10) || 3000;

    try {
      server.listen(PORT, () =>
        console.log(
          `> Ready on http://localhost:${PORT} \n> API: http://localhost:${PORT}/graphql`
        )
      );
    } catch (err) {
      if (err) throw err;
    }
  });
})();
