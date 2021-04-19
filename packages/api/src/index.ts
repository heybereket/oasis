import { config } from "dotenv";
config();

import { ApolloError, ApolloServer } from "apollo-server-micro";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { IncomingMessage } from "http";

const accessDeniedMsg = "Damn. You kinda don't have access to this api";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }: { req: IncomingMessage }) {
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");

    if (token !== process.env.API_ACCESS_TOKEN) {
      throw new ApolloError(accessDeniedMsg);
    }

    return {};
  },
  formatError(err) {
    if (err.message.includes(accessDeniedMsg)) {
      return new Error(accessDeniedMsg);
    }
    return err;
  },
  playground: true,
  introspection: true,
});
