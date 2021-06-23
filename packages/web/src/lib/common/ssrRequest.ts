import { NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from '../apollo';
import { graphql, DocumentNode, print } from 'graphql';
import { IncomingMessage } from 'http';
import forceRequire from '@utils/require';

type Query = {
  document: DocumentNode;
  variables?: { [key: string]: any };
};

export const ssrRequest = async (
  req: IncomingMessage,
  queries: Query[]
): Promise<NormalizedCacheObject | void> => {
  if (process.env.API_MODE === 'remote') return {};

  const { createSchema } = forceRequire(
    '@oasis-sh/api/dist/utils/files/createSchema'
  );
  const { createContext } = forceRequire(
    '@oasis-sh/api/dist/utils/auth/createContext'
  );
  const schema = await createSchema();
  const apolloClient = initializeApollo();
  const contextValue = await createContext(req);

  // For every document, do the following
  for (const { document, variables = {} } of queries) {
    // Add a "__typename" field because Apollo's cache expects it
    // @todo Change how this is done (editing JSON directly may cause problems in the future)
    const DocumentForGql: DocumentNode = JSON.parse(
      JSON.stringify(document).replace(
        /\[\{"kind":"Field"/g,
        '[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field"'
      )
    );

    // Query the schema with the edited Document
    const { data } = await graphql({
      schema,
      source: print(DocumentForGql),
      variableValues: variables,
      contextValue,
    });

    // Write the query to the cache
    apolloClient.writeQuery({
      query: document,
      variables,
      data,
    });
  }

  // Lastly, return the cache
  return apolloClient.cache.extract();
};
