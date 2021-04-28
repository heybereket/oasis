import { join, dirname } from "path";
import { config } from "dotenv";

const ROOT = process.env.PROJECT_ROOT
  ? join(process.env.PROJECT_ROOT, "./packages/api")
  : dirname(__dirname);

config({ path: ROOT + "/.env" });

import "reflect-metadata";

import { GraphQLRequestContext } from "apollo-server-plugin-base";
import { ApolloServer } from "apollo-server-micro";
import admin from "./utils/firebase-admin";
import { NextApiRequest } from "next";

import { getSchema } from "./utils/getSchema";

export { getSchema };

export const createApolloServer = async () => {
  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
    context: async ({ req }: { req: NextApiRequest }) => {
      const authHeader = req.headers.authorization;
      const socketInfo = req.socket.address();

      if (!authHeader || !authHeader.startsWith("Bearer "))
        return { hasAuth: false, socketInfo };

      const token = authHeader.substring(7, authHeader.length);

      try {
        const data = await admin.auth().verifyIdToken(token);
        return { hasAuth: true, ...data, socketInfo };
      } catch (e) {
        return { hasAuth: false, socketInfo };
      }
    },
    plugins: [
      {
        requestDidStart() {
          return {
            didResolveOperation(context: GraphQLRequestContext) {
              const reqData = context.context;
              /* {
               hasAuth: false,
               socketInfo: { address: '127.0.0.1', family: 'IPv4', port: 3000 },
              } */
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
