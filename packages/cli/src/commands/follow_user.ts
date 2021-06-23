import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient('http://localhost:3000/graphql', {
<<<<<<< HEAD
    headers: { authorization: 'Bearer INSERT TOKEN HERE' },
=======
    headers: { authorization: 'STFU dulguuncodes' },
>>>>>>> 2f899239 (feat(cli): added more commands)
  });

  const userID = yargs._[1];

<<<<<<< HEAD
  if (!userID) return log.error('you need to pass <username> in order for this to work');
=======
  if (!userID)
    return log.error('you need to pass <username> in order for this to work');
>>>>>>> 2f899239 (feat(cli): added more commands)

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
