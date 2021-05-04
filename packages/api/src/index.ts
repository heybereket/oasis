import "reflect-metadata";
import { config } from "dotenv";
config();

import express from "express";
import { Connection, createConnection } from "typeorm";
import { createApolloServer } from "./apolloServer";
import { authRouter } from "./modules/auth";
import session from "express-session";
import { createClient } from "redis";
import connectRedis, { Client } from "connect-redis";
import { ormconfig } from "./ormconfig";

const RedisStore = connectRedis(session);

export const RedisClient = createClient(process.env.NEXT_REDIS_URL);
export let databaseConnection: Connection | undefined = undefined;

export const createApp = async () => {
  databaseConnection = await createConnection(ormconfig);

  const app = express();
  const apolloServer = await createApolloServer();

  app.use(
    session({
      store: new RedisStore({ client: RedisClient }),
      secret: process.env.NEXT_SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: process.env.NODE_ENV === "production", maxAge: null },
    })
  );

  app.use("/api/auth", authRouter);

  apolloServer.applyMiddleware({ app });

  return app;

  // app.listen(PORT, () =>
  //   console.log(`Server started on http://localhost:${PORT}/graphql`)
  // );
};
