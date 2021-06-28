import * as log from '@oasis-sh/shared';
import { client } from '../sdkClient';

export const command = 'fetch_posts --limit <limit> --offset <offset> --json';
export const desc = 'Queries posts from the Oasis API. Returns an array of posts';
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
    default: false,
    describe:
      'writes the raw JSON to stdout, powerful when used with jq (a JSON processor)',
  },
};
export const handler = async (yargs: any) => {
  const limit = yargs.limit ?? 10;
  const offset = yargs.offset ?? 0;
  const useJSON = yargs.json ?? false;

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
