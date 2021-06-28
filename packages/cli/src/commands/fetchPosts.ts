import * as log from '@oasis-sh/shared';
import { client } from '../sdkClient';

interface QueryPostsArguments {
  _: string[];
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
  const limit = yargs.limit;
  const offset = yargs.offset;
  const useJSON = yargs.json;

  const data = await client
    .createQueryBuilder('paginatePosts')
    .addFields({
      id: true,
      message: true,
      author: {
        id: true,
        name: true,
        username: true,
      },
      downvotes: true,
      upvotes: true,
      ARGS: {
        limit,
        offset,
      },
    })
    .send();

  if (useJSON) return console.log(JSON.stringify(data));
  log.info(data);
};
