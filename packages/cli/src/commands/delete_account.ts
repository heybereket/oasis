// deleting accounts will not work because other documents in other tables reference
// the account ID, leading to a foreign key constraint violation

// import * as log from '../utils/log';
// import { gql, GraphQLClient } from 'graphql-request';
// 
// export async function handler(yargs: any) {
//   const useJSON = yargs.json ?? false;
// 
//   const client = new GraphQLClient('http://localhost:3000/graphql', {
//     headers: {
//       authorization: 'STFU dulguuncodes',
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

import * as log from '../utils/log';

export async function handler() {
  log.error("this command has not been implemented yet.")
}
