import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
