import 'reflect-metadata';
import { config } from 'dotenv';
import express from 'express';
import { ConnectionOptions, createConnection } from 'typeorm';
import { createApolloServer } from '@root/apolloServer';
import authRouter from '@modules/auth';
import connectionRouter from '@modules/connections';
import expressSession from 'express-session';
import { redisStore, redisClient } from '@service/redis';
import passport from 'passport';
import checkEnv from '@utils/common/checkEnv';
import { sessionSecret, isProduction, PORT } from '@lib/constants';
import * as log from '@lib/log';
import { checkNodeMajor } from '@lib/nodeMajor';
import { joinRoot } from '@utils/common/rootPath';
import { seedDatabase } from '@utils/testing/seedDatabase';

config();

export const initializeServer = async () => {
  try {
    await checkEnv();
    checkNodeMajor(15);

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

    // Express-Session configuration
    app.use(
      expressSession({
        store: new redisStore({
          client: redisClient,
        }),
        secret: sessionSecret,
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

    // Passport configuration
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    // Authentication API
    app.use('/api/auth', authRouter(passport));

    // Connection API
    app.use('/api/connection', connectionRouter());

    // Apollo GraphQL Server
    apolloServer.applyMiddleware({ app });

    log.event("started api successfully");
    return app;
  } catch (err) {
      log.error(err);
    }
  };

  if (require.main === module) {
    initializeServer().then((app) => {
      if (!app) process.exit(1);

      app.listen(PORT, () =>
        log.ready(`Ready on http://localhost:${PORT}/graphql`)
      );
    });
}
