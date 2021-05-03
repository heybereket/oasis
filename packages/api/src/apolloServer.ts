import { ApolloServer } from "apollo-server-express";
import type { Request } from "express";
import User from "./entities/User";
import { getSchema } from "./utils/getSchema";

export type ContextType = {
  hasAuth: boolean;
  getUser: () => Promise<User>;
};

export const createApolloServer = async () =>
  new ApolloServer({
    schema: await getSchema(),
    context: async ({ req }: { req: Request }): Promise<ContextType> => {
      const uid = (req.session as any)?.passport?.user?.id;

      return { hasAuth: !!uid, getUser: () => User.findOne(uid) };
    },
    playground: true,
    introspection: true,
  });
