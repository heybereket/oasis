import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';
import { GQL_URL } from '../constants';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;
  if (!yargs.message) {
    return log.error('you need to pass <message> in order for this to work');
  }

  const client = new GraphQLClient(GQL_URL, {
    headers: { authorization: 'Bearer INSERT TOKEN HERE' }, //TODO: Setup
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
}
