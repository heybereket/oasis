import * as log from '@oasis-sh/shared';
import { gqlURL } from '@oasis-sh/shared';
import { gql, GraphQLClient } from 'graphql-request';

export const handler = async (yargs: any) => {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient(gqlURL);

  const searchQuery = yargs._.slice(1).join(' ');
  const limit = yargs.limit ?? 10.0;

  if (!searchQuery)
    return log.error(
      'you need to pass <search query> in order for this to work'
    );

  const query = gql`
    query Search($searchQuery: String!, $limit: Float!) {
      search(searchQuery: $searchQuery, limit: $limit) {
        __typename
        ... on User {
          id
          userBanner: banner
          avatar
          createdAt
          github
          twitter
          discord
          google
          bio
          username
          verified
          roles
          displayName: name
        }
        ... on Post {
          id
          message
          author {
            username
            avatar
            name
          }
          comments(limit: 0, offset: 0) {
            total
          }
          createdAt
          upvotes
          downvotes
        }
        ... on Resort {
          name
          description
          banner
        }
      }
    }
  `;

  client
    .request(query, {
      searchQuery,
      limit,
    })
    .then((res) => {
      if (useJSON) return console.log(JSON.stringify(res));
      log.info(res);
    });
};
