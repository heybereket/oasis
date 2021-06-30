import * as log from '../utils/output/log';
import { gqlURL } from '../lib/constants';
import { gql, GraphQLClient } from 'graphql-request';

interface GetUsersUpvotedPostsArguments {
  username?: string;
  limit: number;
  offset: number;
  json: boolean;
}

export const command =
  'get_users_upvoted_posts <username> [limit] [offset] [json]';
export const desc = "Fetches a user's upvoted posts. Returns an array of posts";

export const builder = {
  username: {
    type: 'string',
    describe: 'the user to query about',
  },
  limit: {
    default: 10.0,
    describe: 'sets limit on the number of posts to query',
  },
  offset: {
    default: 0.0,
    describe: 'offset the posts are being queried, useful for paginating posts',
  },
  json: {
    describe:
      'writes the raw JSON to stdout, powerful when used with jq (a JSON processor)',
  },
};

export const handler = async (yargs: GetUsersUpvotedPostsArguments) => {
  const useJSON = yargs.json;

  const client = new GraphQLClient(gqlURL);

  const username = yargs.username;
  const postsLimit = yargs.limit;
  const postsOffset = yargs.offset;

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
    .then(({ getUserByName }) => {
      if (useJSON)
        return console.log(JSON.stringify(getUserByName.upvotedPosts));

      log.info(getUserByName.upvotedPosts);
    });
};
