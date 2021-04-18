import { config } from "dotenv";
import { join } from "path";

config({ path: join(process.env.PROJECT_ROOT, "/packages/api/.env") });

import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
