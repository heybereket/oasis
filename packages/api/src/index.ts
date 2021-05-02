import { join, dirname } from 'path';
import { config } from 'dotenv';

const ROOT = process.env.PROJECT_ROOT
  ? join(process.env.PROJECT_ROOT, './packages/api')
  : dirname(__dirname);

config({ path: ROOT + '/.env' });

import 'reflect-metadata';

import { GraphQLRequestContext } from 'apollo-server-plugin-base';
import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest } from 'next';

import { getComplexity, simpleEstimator } from 'graphql-query-complexity';
import depthLimit from 'graphql-depth-limit';

import { getSchema } from './utils/get/getSchema';
import { TypeInfo, ValidationContext } from 'graphql';
import getDepth from './utils/get/getDepth';
import { contextFromToken } from './utils/contextFromToken';

export { getSchema, contextFromToken };

export const createApolloServer = async () => {
  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
    context: async ({ req }: { req: NextApiRequest }) => {
      const cookies = req.headers.cookie ?? '';
      const cookiesArr = cookies.split('; ');
      const cookieData = cookiesArr.find((row) => row.startsWith('token='));
      const token = cookieData?.split('=')[1];

      const socketInfo = req.socket.address();

      if (!token || token === '') return { hasAuth: false, socketInfo };

      return contextFromToken(token, socketInfo);
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

              getDepth(validationContext);
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
