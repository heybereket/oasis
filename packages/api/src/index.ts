import { config } from "dotenv";
config();

import { ApolloServer } from "apollo-server-micro";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});
