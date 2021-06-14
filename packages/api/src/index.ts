import 'reflect-metadata';
import { config } from 'dotenv';
import express from 'express';
import { createApolloServer } from '@root/server';
import authRouter from '@auth/oauth';
import connectionRouter from '@auth/connections';
import expressSession from 'express-session';
import { redisStore, redisClient } from '@config/redis';
import passport from 'passport';
import { checkEnv } from '@utils/common/checkEnv';
import { sessionSecret, isProduction, PORT } from '@lib/constants';
import * as log from '@lib/log';
import { checkNodeMajor } from '@lib/nodeMajor';
import { getDatabase } from '@config/database';

config();

export const initializeServer = async () => {
  try {
    await checkEnv();
    await getDatabase();
    checkNodeMajor(15);

    const app = express();
    app.disable('x-powered-by');

    if (process.env.OASIS_API_TRUST_PROXY === 'true') {
      app.set('trust proxy', 1);
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

    log.event('api started successfully');
    return app;
  } catch (err) {
      log.error(err);
    }
  };

  if (require.main === module) {
    initializeServer().then((app) => {
      if (!app) process.exit(1);

      app.listen(PORT, () =>
        log.ready(`ready on http://localhost:${PORT}/graphql`)
      );
    });
}
