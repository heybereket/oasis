import * as log from '@oasis-sh/shared';
import { gqlURL } from '@oasis-sh/shared';
import { gql, GraphQLClient } from 'graphql-request';

export const command = 'follow <user> [json]';
export const desc =
  'Follows a user. <user> must be a valid user ID. Must be authenticated with "oasis login" before running';

export const builder = {
  json: {
    default: false,
    describe:
      'writes the raw JSON to stdout, powerful when used with jq (a JSON processor)',
  },
};

export const handler = async (yargs: any) => {
  const useJSON = yargs.json;

  const client = new GraphQLClient(gqlURL, {
    headers: { authorization: 'Bearer INSERT TOKEN HERE' },
  });

  const userID = yargs._[1];

  if (!userID)
    return log.error('you need to pass <username> in order for this to work');

  const query = gql`
    mutation FollowUser($userId: String!) {
      followUser(userId: $userId)
    }
  `;

  client.request(query, { userId: userID }).then((res) => {
    if (useJSON) return console.log(JSON.stringify(res));
    log.info(res);
  });
};
