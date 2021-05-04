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

export const RedisClient = createClient(process.env.REDIS_URL);
export let databaseConnection: Connection | undefined = undefined;

(async () => {
  databaseConnection = await createConnection(ormconfig);

  const app = express();
  const apolloServer = await createApolloServer();

  const PORT = process.env.PORT || 4000;

  app.use(
    session({
      store: new RedisStore({ client: RedisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: process.env.NODE_ENV === "production", maxAge: null },
    })
  );

  app.use("/api/auth", authRouter);

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}/graphql`)
  );
})();
