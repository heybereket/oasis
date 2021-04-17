import { config } from "dotenv";
import { join, dirname } from "path";

config({ path: join(dirname(process.cwd()), "/api/.env") });

import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
