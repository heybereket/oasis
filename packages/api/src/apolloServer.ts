import { ApolloServer } from 'apollo-server-express';
import type { Request } from 'express';
import User from './entities/User';
import { createContext } from './utils/auth/createContext';
import { getSchema } from './utils/getSchema';

export type ContextType = {
  hasAuth: boolean;
  uid: string;
  getUser: () => Promise<User>;
};

export const createApolloServer = async () =>
  new ApolloServer({
    schema: await getSchema(),
    context: async ({ req }: { req: Request }) => createContext(req),
    playground: true,
    introspection: true,
  });
