import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';
import { GQL_URL } from '../constants';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;
  const { _, $0, ...data } = yargs;

  const rawData = _;

  const client = new GraphQLClient(GQL_URL, {
    headers: {
      authorization: 'Bearer INSERT TOKEN HERE',
    },
  });

  const query = gql`
    mutation updateProfile($data: UpdateProfileInput!) {
      updateProfile(data: $data)
    }
  `;

  try {
    const data = JSON.parse(rawData);

    client
      .request(query, { data })
      .then((res) => {
        if (useJSON) return console.log(JSON.stringify(res));
        log.info(res);
      })
      .catch(console.error);
  } catch (e) {
    if (!data) return log.error(e);

    client.request(query, { data }).then((res) => {
      if (useJSON) return console.log(JSON.stringify(res));
      log.info(res);
    });
  }
}
