import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';
import { GQL_URL } from '../constants';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient(GQL_URL, {
    headers: {
      authorization: 'Bearer INSERT TOKEN HERE',
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
