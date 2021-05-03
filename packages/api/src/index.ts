import "reflect-metadata";
import { config } from "dotenv";
config();

import express from "express";
import { createConnection } from "typeorm";
import { ormconfig } from "./ormconfig";
import { createApolloServer } from "./apolloServer";

(async () => {
  await createConnection(ormconfig);

  const app = express();
  const apolloServer = await createApolloServer();

  const PORT = process.env.PORT || 4000;

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}/graphql`)
  );
})();
