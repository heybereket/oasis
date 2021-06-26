// deleting accounts will not work because other documents in other tables reference
// the account ID, leading to a foreign key constraint violation

// import * as log from '../utils/log';
// import { gql, GraphQLClient } from 'graphql-request';
//
// export async function handler(yargs: any) {
//   const useJSON = yargs.json ?? false;
//
//   const client = new GraphQLClient(GQL_URL, {
//     headers: {
//       authorization: 'Bearer INSERT TOKEN HERE',
//     },
//   });
//
//   const query = gql`
//     mutation deleteAccount {
//       deleteAccount
//     }
//   `;
//
//   client.request(query).then((res) => {
//     if (useJSON) return console.log(JSON.stringify(res));
//     log.info(res);
//   });
// }

import * as log from '@oasis-sh/shared';

export const handler = async (yargs: any) => {
  log.error('this command has not been implemented yet.');
};
