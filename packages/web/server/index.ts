import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '../../api/.env') });
import next from 'next';
import { createApp } from '@oasis/api';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: require('../next.config.js') });
const handle = app.getRequestHandler();

(async () => {
  const server = await createApp();

  app.prepare().then(() => {
    server.all('*', (req, res) => {
      return handle(req, res)
  });

  const PORT = parseInt(process.env.PORT as string, 10) || 3000;

  try {
    server.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}/ \nIf you want the API: http://localhost:${PORT}/graphql`));
  }
  catch (err) {
    console.error(err.message);
  }
});
})();
