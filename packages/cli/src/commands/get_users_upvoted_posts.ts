import * as log from '@oasis-sh/shared';
import { gqlURL } from '@oasis-sh/shared';
import { gql, GraphQLClient } from 'graphql-request';

export const handler = async (yargs: any) => {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient(gqlURL);

  const username = yargs._[1];
  const postsLimit = yargs.limit ?? 10.0;
  const postsOffset = yargs.limit ?? 0.0;

  if (!username)
    return log.error('you need to pass <username> in order for this to work');

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
      username,
      postsLimit,
      postsOffset,
    })
    .then((res) => {
      if (useJSON) return console.log(JSON.stringify(res));
      log.info(res);
    });
};
