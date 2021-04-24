import "reflect-metadata";
import { config } from "dotenv";
import { join, dirname } from "path";

const ROOT = process.env.PROJECT_ROOT
  ? join(process.env.PROJECT_ROOT, "./packages/api")
  : dirname(__dirname);

config({ path: ROOT + "/.env" });

import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { getResolvers } from "./resolvers";
import depthLimit from "graphql-depth-limit";

export const createApolloServer = async () => {
  const resolvers: any = await getResolvers();
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile:
      process.env.NODE_ENV === "development" ? "../api/schema.gql" : false,
  });

  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(3)],
    playground: true,
    introspection: true,
  });

  return server;
};
