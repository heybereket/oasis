import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient('http://localhost:3000/graphql', {
    headers: { authorization: 'Bearer INSERT TOKEN HERE' },
  });

  const userID = yargs._[1];

  if (!userID) return log.error('you need to pass <username> in order for this to work');

  const query = gql`
    mutation FollowUser($userId: String!) {
      followUser(userId: $userId)
    }
  `;

  client.request(query, { userId: userID }).then((res) => {
    if (useJSON) return console.log(JSON.stringify(res));
    log.info(res);
  });
}
