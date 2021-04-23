import "reflect-metadata";
import { config } from "dotenv";
config();
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { getResolvers } from "./resolvers";
import depthLimit from "graphql-depth-limit";

export const createApolloServer = async () => {
  const resolvers: any = await getResolvers();

  const schema = await buildSchema({
    resolvers,
    emitSchemaFile:
      process.env.NODE_ENV === "development" ? "./schema.gql" : false,
  });

  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(3)],
    playground: true,
    introspection: true,
  });

  return server;
};
