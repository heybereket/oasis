import { ApolloError, ApolloServer } from 'apollo-server-express';
import type { Request } from 'express';
import {
  fieldExtensionsEstimator,
  simpleEstimator,
  getComplexity,
} from 'graphql-query-complexity';
import User from '@entities/User';
import { createContext } from '@utils/auth/createContext';
import { createSchema } from '@utils/files/createSchema';
import { complexityLimit } from '@lib/constants';

export type ContextType = {
  hasAuth: boolean;
  uid: string;
  getUser: () => Promise<User>;
  req: Request;
};

export const createApolloServer = async () => {
  const schema = await createSchema();

  return new ApolloServer({
    schema,
    tracing: true,
    introspection: true,
    // uploads: false,
    playground: {
      settings: {
        'request.credentials': 'same-origin',
      },
    },
    context: async ({ req }: { req: Request }) => createContext(req),
    plugins: [
      {
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              operationName: request.operationName,
              query: document,
              variables: request.variables,
              estimators: [
                fieldExtensionsEstimator(),
                simpleEstimator({ defaultComplexity: 0 }),
              ],
            });

            if (complexity > complexityLimit) {
              throw new ApolloError('Query complexity was bigger than 50!');
            }
          },
        }),
      },
    ],
  });
};
