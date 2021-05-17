import 'reflect-metadata';
import { config } from 'dotenv';
config();

import express from 'express';
import { createConnection } from 'typeorm';
import { createApolloServer } from '@root/apolloServer';
import authRouter from '@modules/auth';
import expressSession from 'express-session';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import { ormconfig } from '@root/ormconfig';
import passport from 'passport';
import checkEnv from '@utils/common/checkEnv';
import { isProduction } from '@lib/constants';
import { chalkLog } from '@lib/chalkLog';

const RedisStore = connectRedis(expressSession);

const redisClient = createClient(process.env.OASIS_API_REDIS_URL);

export const createApp = async () => {
  if (!(await checkEnv())) {
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
        secure: isProduction,
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
  const PORT = parseInt(process.env.PORT as string, 10) || 4000;
  createApp().then((app) => {
    if (!app) process.exit(1);

    app.listen(PORT, () =>
      chalkLog('success', `Ready on http://localhost:${PORT}/graphql`)
    );
  });
}
