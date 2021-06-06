import 'reflect-metadata';
import { config } from 'dotenv';
config();

import express from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';
import { createApolloServer } from '@root/apolloServer';
import authRouter from '@modules/auth';
import connectionRouter from '@modules/connections';
import expressSession from 'express-session';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import passport from 'passport';
import checkEnv from '@utils/common/checkEnv';
import { isProduction } from '@lib/constants';
import * as log from '@lib/log';
import { exit } from '@lib/exit';
import { joinRoot } from '@utils/common/rootPath';
import { seedDatabase } from '@utils/test-utils/seedDatabase';

const RedisStore = connectRedis(expressSession);

export const redisClient = createClient(process.env.OASIS_API_REDIS_URL);

export const createApp = async () => {
  if (!(await checkEnv())) {
    return undefined;
  }

  const nodeMajor = Number(process.versions.node.split('.')[0]);

  if (nodeMajor < 15) {
    log.error(
      `You are currently running on Node ${nodeMajor}. Oasis requires Node 15 or higher.`
    );
    exit(1);
  }

  const app = express();
  app.disable('x-powered-by');

  if (process.env.OASIS_API_TRUST_PROXY === 'true') {
    app.set('trust proxy', 1);
  }

  let ormconfig: ConnectionOptions;
  if (process.env.TESTING === 'true') {
    ormconfig = {
      type: 'sqlite',
      database: 'testing.sqlite',
      entities: [joinRoot('./entities/*.*')],
      synchronize: true,
    };
  } else {
    ormconfig = require('@root/ormconfig').default;
  }

  await createConnection(ormconfig);

  if (process.env.TESTING === 'true') {
    seedDatabase();
  }

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

  /* Connection API */
  app.use('/api/connection', connectionRouter());

  /* Apollo GraphQL Server */
  apolloServer.applyMiddleware({ app });

  return app;
};

if (require.main === module) {
  const PORT = Number(process.env.PORT) || 3000;
  createApp().then((app) => {
    if (!app) process.exit(1);

    app.listen(PORT, () =>
      log.ready(`Ready on http://localhost:${PORT}/graphql`)
    );
  });
}
