import * as log from '../utils/output/log';
import { gql, GraphQLClient } from 'graphql-request';
import { BaseArguments } from '../types/arguments';

interface QueryPostsArguments extends BaseArguments {
  limit: number;
  offset: number;
  json: boolean;
}

export const command = 'fetch_posts [limit] [offset] [json]';
export const desc =
  'Queries posts from the Oasis API. Returns an array of posts';

export const builder = {
  limit: {
    default: 10.0,
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

export const handler = async (yargs: QueryPostsArguments) => {
  const postsLimit = yargs.limit;
  const postsOffset = yargs.offset;
  const useJSON = yargs.json;

  const query = gql`
    query PaginatePosts($postsLimit: Float!, $postsOffset: Float!) {
      paginatePosts(limit: $postsLimit, offset: $postsOffset) {
        author {
          id
          name
          username
          badges {
            description
            id
            imagePath
          }
          avatar
        }
        createdAt
        downvotes
        id
        lastEdited
        upvotes
        message
        resort {
          id
          description
          logo
          name
        }
        comments(limit: 0, offset: 0) {
          total
        }
        topics
        isUpvoted
        isDownvoted
        imageName
      }
    }
  `;

  const client = new GraphQLClient(yargs.server, {
    headers: { authorization: yargs.auth },
  });

  const { paginatePosts } = await client.request(query, { postsLimit, postsOffset });

  if (useJSON) return console.log(JSON.stringify(paginatePosts));
  log.info(paginatePosts);
};
