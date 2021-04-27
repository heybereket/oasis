import "reflect-metadata";
import { config } from "dotenv";
import { join, dirname } from "path";

import { GraphQLRequestContext } from "apollo-server-plugin-base";
import { ApolloServer } from "apollo-server-micro";
import admin from "./utils/firebase-admin";
import { NextApiRequest } from "next";
const ROOT = process.env.PROJECT_ROOT
  ? join(process.env.PROJECT_ROOT, "./packages/api")
  : dirname(__dirname);

config({ path: ROOT + "/.env" });

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
      return await admin
        .auth()
        .verifyIdToken(token)
        .then((data) => {
          return { hasAuth: true, ...data, socketInfo };
        })
        .catch(() => {
          return { hasAuth: false, socketInfo };
        });
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
