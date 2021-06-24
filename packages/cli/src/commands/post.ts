import * as log from '@oasis-sh/shared';
import { gqlURL } from '@oasis-sh/shared';
import { gql, GraphQLClient } from 'graphql-request';

export const handler = async (yargs: any) => {
  const useJSON = yargs.json ?? false;
  if (!yargs.message) {
    return log.error('you need to pass <message> in order for this to work');
  }

  const client = new GraphQLClient(gqlURL, {
    headers: { authorization: 'Bearer INSERT TOKEN HERE' },
  });

  const query = gql`
    mutation CreatePost($message: String!) {
      createPost(data: { message: $message, topics: [] })
    }
  `;

  client.request(query, { message: yargs.message }).then((res) => {
    if (useJSON) return console.log(JSON.stringify(res));
    log.info(res);
  });
};
