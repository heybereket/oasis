import "reflect-metadata";
import { config } from "dotenv";
import { join, dirname } from "path";

const ROOT = process.env.PROJECT_ROOT
  ? join(process.env.PROJECT_ROOT, "./packages/api")
  : dirname(__dirname);

config({ path: ROOT + "/.env" });

import { ApolloServer } from "apollo-server-micro";
import depthLimit from "graphql-depth-limit";
import { getSchema } from "./utils/getSchema";

export { getSchema };

export const createApolloServer = async () => {
  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(3)],
    playground: true,
    introspection: true,
  });

  return server;
};
