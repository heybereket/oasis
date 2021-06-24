import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';
import { GQL_URL } from '../constants';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient(GQL_URL, {
    headers: {
      authorization: 'STFU dulguuncodes',
    },
  });

  const query = gql`
    query {
      currentUser {
        id
        banner
        avatar
        createdAt
        github
        twitter
        discord
        google
        bio
        username
        name
        verified
        roles
      }
    }
  `;

  client.request(query).then((res) => {
    if (useJSON) return console.log(JSON.stringify(res));
    log.info(res);
  });
}
