import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient('http://localhost:3000/graphql', {
    headers: {
      authorization: 'STFU dulguuncodes',
    },
  });

  const query = gql`
    query getMyUserId {
      currentUser {
        id
      }
    }
  `;

  client.request(query).then((res) => {
    if (useJSON) return console.log(JSON.stringify(res));
    log.info(res);
  });
}
