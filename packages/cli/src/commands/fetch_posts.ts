import * as log from '@oasis-sh/shared';
import { gqlURL } from '@oasis-sh/shared';
import { request, gql } from 'graphql-request';

export async function handler(yargs: any) {
  const limit = yargs.limit ?? 10;
  const offset = yargs.offset ?? 0;
  const useJSON = yargs.json ?? false;

  const query = gql`
    query paginatePosts($postsLimit: Float!, $postsOffset: Float!) {
      paginatePosts(limit: $postsLimit, offset: $postsOffset) {
        message
        author {
          id
          name
          username
        }
        downvotes
        upvotes
      }
    }
  `;

  request(gqlURL, query, {
    postsLimit: limit,
    postsOffset: offset,
  }).then((res) => {
    if (useJSON) return console.log(JSON.stringify(res));
    log.info(res);
  });
}
