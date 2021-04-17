import { config } from "dotenv";
config();
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./typeDefs";
import getResolvers from "./resolvers";

export async function getApolloServer(): Promise<ApolloServer> {
  var resolvers = await getResolvers;
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
}
