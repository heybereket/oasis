import { fetch } from 'cross-fetch';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const createClient = (authHeader = 'TESTING testing') => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: authHeader,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};
