import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient('https://dev.oasis.sh/graphql');

  const searchQuery = yargs._.slice(1).join(' ');
<<<<<<< HEAD
  const limit = yargs.limit ?? 10.0;

  if (!searchQuery) return log.error(
      'you need to pass <search query> in order for this to work'
    );
=======
	const limit = yargs.limit ?? 10.0

  if (!searchQuery)
    return log.error('you need to pass <search query> in order for this to work');
>>>>>>> 293dbe7e (feat(cli): search command, more fetches, etc)

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
<<<<<<< HEAD
      searchQuery,
      limit,
=======
      searchQuery: searchQuery,
      limit: limit,
>>>>>>> 293dbe7e (feat(cli): search command, more fetches, etc)
    })
    .then((res) => {
      if (useJSON) return console.log(JSON.stringify(res));
      log.info(res);
    });
}
