import { getSchema } from '@oasis/api';
import { NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from './apolloClient';
import { graphql, DocumentNode, print } from 'graphql';

// Creates a GraphQL request for SSR or SSG.
// Instead of sending a request to the api
// endpoint, this uses the schema from
// TypeGraphQL and queries that. This method
// increases performance

type Query = { document: DocumentNode; variables?: { [key: string]: any } };

export const ssrRequest = async (
  ...queries: Query[]
): Promise<NormalizedCacheObject> => {
  const schema = await getSchema();
  const apolloClient = initializeApollo();

  // For every document, follow the steps below
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
