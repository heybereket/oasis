import * as log from '../utils/output/log';
import { gqlURL } from '../lib/constants';
import { gql, GraphQLClient } from 'graphql-request';
import { BaseArguments } from '../types/arguments';

interface PostMutationArguments extends BaseArguments {
  message: string;
  json: boolean;
}

export const command = 'post <message> [json]';
export const desc = "Adds a post under the authorized user's account";

export const builder = {
  message: {
    type: 'string',
    describe: 'the body of the message you are trying to relay',
  },
  json: {
    describe:
      'writes the raw JSON to stdout, powerful when used with jq (a JSON processor)',
  },
};

export const handler = async (yargs: PostMutationArguments) => {
  const useJSON = yargs.json;

  if (!yargs.message) {
    return log.error('you need to pass <message> in order for this to work');
  }

  const client = new GraphQLClient(gqlURL, {
    headers: { authorization: yargs.auth },
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
