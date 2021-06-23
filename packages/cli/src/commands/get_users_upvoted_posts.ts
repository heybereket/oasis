import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient('https://dev.oasis.sh/graphql');

  const username = yargs._[1];
  const postsLimit = yargs.limit ?? 10.0;
  const postsOffset = yargs.limit ?? 0.0;

<<<<<<< HEAD
  if (!username) return log.error('you need to pass <username> in order for this to work');
=======
  if (!username)
    return log.error('you need to pass <username> in order for this to work');
>>>>>>> 293dbe7e (feat(cli): search command, more fetches, etc)

  const query = gql`
    query getUsersUpvotedPosts(
      $username: String!
      $postsLimit: Float!
      $postsOffset: Float!
    ) {
      getUserByName(username: $username) {
        upvotedPosts(offset: $postsOffset, limit: $postsLimit) {
          items {
            id
            message
            createdAt
            lastEdited
            topics
            author {
              id
              avatar
              username
              name
            }
            isUpvoted
            isDownvoted
            upvotes
            downvotes
            comments(limit: 0, offset: 0) {
              total
            }
          }
          hasMore
          total
        }
      }
    }
  `;

  client
    .request(query, {
<<<<<<< HEAD
      username,
      postsLimit,
      postsOffset,
=======
      username: username,
      postsLimit: postsLimit,
      postsOffset: postsOffset,
>>>>>>> 293dbe7e (feat(cli): search command, more fetches, etc)
    })
    .then((res) => {
      if (useJSON) return console.log(JSON.stringify(res));
      log.info(res);
    });
}
