import "reflect-metadata";
import { config } from "dotenv";
import { join, dirname } from "path";

import {
  GraphQLRequestContext,
  GraphQLRequestListener,
} from "apollo-server-plugin-base";

const ROOT = process.env.PROJECT_ROOT
  ? join(process.env.PROJECT_ROOT, "./packages/api")
  : dirname(__dirname);

config({ path: ROOT + "/.env" });

import { ApolloServer } from "apollo-server-micro";
import { getSchema } from "./utils/getSchema";

export { getSchema };

export const createApolloServer = async () => {
  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
    // context: (c: any) => ({
    //   ...c,
    //   cool: "world",
    // }),
    plugins: [
      {
        requestDidStart() {
          return {
            didResolveOperation(context: GraphQLRequestContext) {
              console.log(context + "hello");
            },
          };
        },
      },
    ],
    playground: true,
    introspection: true,
  });

  return server;
};
