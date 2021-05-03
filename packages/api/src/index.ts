import "reflect-metadata";
import { config } from "dotenv";
config();

import express from "express";
import { createConnection } from "typeorm";
import { createApolloServer } from "./apolloServer";
import { authRouter } from "./modules/auth";
import session from "express-session";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import { ormconfig } from "./ormconfig";

const RedisStore = connectRedis(session);

const client = createClient(process.env.REDIS_URL);

(async () => {
  await createConnection(ormconfig);

  const app = express();
  const apolloServer = await createApolloServer();

  const PORT = process.env.PORT || 4000;

  app.use(
    session({
      store: new RedisStore({ client }),
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
