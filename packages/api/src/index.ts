import 'reflect-metadata';
import { config } from 'dotenv';
config();

import express from 'express';
import { createConnection } from 'typeorm';
import { createApolloServer } from './apolloServer';
import authRouter from './modules/auth';
import expressSession from 'express-session';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import { ormconfig } from './ormconfig';
import passport from 'passport';
import checkEnv from './utils/checkEnv';

const RedisStore = connectRedis(expressSession);

const redisClient = createClient(process.env.OASIS_API_REDIS_URL);

export const createApp = async () => {
  if (!(await checkEnv())) {
    console.error(">> For more information, refer to the oasis.sh developer's wiki: https://github.com/oasis-sh/oasis/wiki/API-Quick-Start")
    return undefined;
  }

  const app = express();
  app.disable('x-powered-by');

  if (process.env.OASIS_API_TRUST_PROXY === 'true') {
    app.set('trust proxy', 1);
  }

  await createConnection(ormconfig);
  const apolloServer = await createApolloServer();

  /* Express-Session configuration */
  app.use(
    expressSession({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.OASIS_API_SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        domain: process.env.OASIS_API_PUBLIC_DOMAIN,
        secure: process.env.NODE_ENV === 'production',
        maxAge: null,
        signed: true,
        sameSite: 'lax',
      },
    })
  );

  /* Passport configuration */
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  /* Authentication API */
  app.use('/api/auth', authRouter(passport));

  /* Apollo GraphQL Server */
  apolloServer.applyMiddleware({ app });

  return app;
};

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  createApp().then((app) => {
    if (!app) process.exit(1);

    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}/graphql`)
    );
  });
}
