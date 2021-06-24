import * as log from '@oasis-sh/shared';
import { gqlURL } from '@oasis-sh/shared';
import { gql, GraphQLClient } from 'graphql-request';

export const handler = async (yargs: any) => {
  const useJSON = yargs.json ?? false;

  const client = new GraphQLClient(gqlURL, {
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
};
