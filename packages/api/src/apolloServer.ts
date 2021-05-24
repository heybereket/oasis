import { ApolloError, ApolloServer } from 'apollo-server-express';
import type { Request } from 'express';
import {
  fieldExtensionsEstimator,
  simpleEstimator,
  getComplexity,
} from 'graphql-query-complexity';
import User from '@entities/User';
import { createContext } from '@utils/auth/createContext';
import { getSchema } from '@utils/getSchema';

export type ContextType = {
  hasAuth: boolean;
  uid: string;
  getUser: () => Promise<User>;
};

export const createApolloServer = async () => {
  const schema = await getSchema();

  return new ApolloServer({
    schema,
    context: async ({ req }: { req: Request }) => createContext(req),
    // validationRules: [],
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

            if (complexity > 50) {
              throw new ApolloError('Query complexity was bigger than 50!');
            }
          },
        }),
      },
    ],
    playground: true,
    introspection: true,
  });
};
