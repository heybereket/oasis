import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';
import { GQL_URL } from '../constants';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient(GQL_URL);

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
}
