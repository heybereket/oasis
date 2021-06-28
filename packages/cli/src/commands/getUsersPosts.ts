import * as log from '@oasis-sh/shared';
import { gqlURL } from '@oasis-sh/shared';
import { gql, GraphQLClient } from 'graphql-request';

export const command = 'get_users_posts <username> [json]';
export const builder = {
  limit: {
    default: 10.0,
    type: { type: 'float' },
    describe: 'sets limit on the number of posts to query',
  },
  offset: {
    default: 0.0,
    describe:
      'offsets the posts that are being queries, useful for paginating posts',
  },
  json: {
    describe:
      'writes the raw JSON to stdout, powerful when used with jq (a JSON processor)',
  },
};
export const handler = async (yargs: any) => {
  const useJSON = yargs.json;

  const client = new GraphQLClient(gqlURL);

  const username = yargs._[1];
  const postsLimit = yargs.limit;
  const postsOffset = yargs.offset;

  if (!username)
    return log.error('you need to pass <username> in order for this to work');

  const query = gql`
    query getUsersPosts(
      $username: String!
      $postsLimit: Float!
      $postsOffset: Float!
    ) {
      userOnlyPosts: getUserByName(username: $username) {
        posts(offset: $postsOffset, limit: $postsLimit) {
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
      if (useJSON) return console.log(JSON.stringify(res.userOnlyPosts));
      log.info(res.userOnlyPosts);
    });
};
