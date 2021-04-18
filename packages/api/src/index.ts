import { config } from "dotenv";

config();

import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
