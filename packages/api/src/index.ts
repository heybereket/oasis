import "reflect-metadata";
import { config } from "dotenv";
config();

import express from "express";
import { createConnection } from "typeorm";
import { isProd, ormconfig } from "./ormconfig";
import { createApolloServer } from "./apolloServer";
import { authRouter } from "./modules/auth";
import session from "express-session";

(async () => {
  await createConnection(ormconfig);

  const app = express();
  const apolloServer = await createApolloServer();

  const PORT = process.env.PORT || 4000;

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: isProd, maxAge: null },
    })
  );
  app.use("/api/auth", authRouter);

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}/graphql`)
  );
})();
