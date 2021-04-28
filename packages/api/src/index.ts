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

import { getComplexity, simpleEstimator } from "graphql-query-complexity";
import depthLimit from "graphql-depth-limit";

import { getSchema } from "./utils/getSchema";
import { TypeInfo, ValidationContext } from "graphql";
import getDepth from "./utils/getDepth";

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
              const validationContext = new ValidationContext(
                schema,
                context.document,
                new TypeInfo(schema),
                () => null
              );

              const complexity = getComplexity({
                estimators: [simpleEstimator({ defaultComplexity: 1 })],
                schema,
                query: context.document,
              });

              getDepth(validationContext, (depths) => console.log(depths));
              console.log(`Complexity: ${complexity}`);
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
