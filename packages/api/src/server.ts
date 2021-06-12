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
import { isDevelopment, complexityLimit } from '@lib/constants';

export type ContextType = {
  hasAuth: boolean;
  uid: string;
  getUser: () => Promise<User>;
};

export const createApolloServer = async () => {
  const schema = await createSchema();

  return new ApolloServer({
    schema,
    tracing: true,
    cacheControl: true,
    playground: true,
    introspection: isDevelopment,
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
