import * as log from '../utils/log';
import { gql, GraphQLClient } from 'graphql-request';

export async function handler(yargs: any) {
  const useJSON = yargs.json ?? false;

  const username = yargs._[1];

  if (!username)
    return log.error('you need to pass <username> in order for this to work');

  const client = new GraphQLClient('https://dev.oasis.sh/graphql');

  const query = gql`
    query getUserByName($username: String!) {
      getUserByName(username: $username) {
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
        badges {
          name
          id
          imagePath
          level
          description
        }
        followers(offset: 0, limit: 0) {
          total
        }
        following(offset: 0, limit: 0) {
          total
        }
        posts(offset: 0, limit: 0) {
          total
        }
      }
    }
  `;

  client.request(query, { username }).then((res) => {
    if (useJSON) return console.log(JSON.stringify(res));
    log.info(res);
  });
}
