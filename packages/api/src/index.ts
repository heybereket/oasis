import "reflect-metadata";
import { config } from "dotenv";
import { join, dirname } from "path";
import { NextApiRequest } from "next";

import { GraphQLRequestContext } from "apollo-server-plugin-base";
import { ApolloServer } from "apollo-server-micro";
import admin from "./utils/firebase-admin";

const ROOT = process.env.PROJECT_ROOT
  ? join(process.env.PROJECT_ROOT, "./packages/api")
  : dirname(__dirname);

config({ path: ROOT + "/.env" });

import { getSchema } from "./utils/getSchema";

export { getSchema };

export const createApolloServer = async (req: NextApiRequest) => {
  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
    context: async (context: any) => {
      const authHeader = req.headers.authorization;
      let data = {
        ...context,
      };

      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7, authHeader.length);
        data.auth = await admin
          .auth()
          .verifyIdToken(token)
          .catch((e) => {});

        console.log(data.auth);
      }

      return data;
    },
    plugins: [
      {
        requestDidStart(context: GraphQLRequestContext) {
          return {
            didResolveOperation(context: GraphQLRequestContext) {
              // console.log(context);
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
