import * as log from '@oasis-sh/shared';
import { client } from '../sdkClient';

export const handler = async (yargs: any) => {
  const limit = yargs.limit ?? 10;
  const offset = yargs.offset ?? 0;
  const useJSON = yargs.json ?? false;

  const data = await client
    .createQueryBuilder('paginatePosts')
    .addFields({
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
