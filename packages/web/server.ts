// import next from 'next';
import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '../api/.env') });
import { parse } from 'url';
import next from 'next';
import { createApp } from '@oasis/api';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: require('./next.config.js') });
const handle = app.getRequestHandler();

(async () => {
  const server = await createApp();

  app.prepare().then(() => {
    server.all('*', (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url ?? '', true);
      //const { pathname, query } = parsedUrl;
      handle(req, res, parsedUrl);
    });

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () =>
      console.log(
        `Server started on http://localhost:${PORT}/ \nIf you want the api: http://localhost:${PORT}/graphql`
      )
    );
  });
})();
