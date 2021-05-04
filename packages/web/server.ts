import next from 'next';
import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '../api/.env') });

import { createApp } from '@oasis/api';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, conf: require('./next.config.js') });
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();

  const app = await createApp();

  app.use((req, res) => {
    handle(req, res);
  });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () =>
    console.log(
      `Server started on http://localhost:${PORT}/ \nIf you want the api: http://localhost:${PORT}/graphql`
    )
  );
})();
