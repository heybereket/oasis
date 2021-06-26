import * as log from '@oasis-sh/shared';
import { gqlURL } from '@oasis-sh/shared';
import { gql, GraphQLClient } from 'graphql-request';

export const handler = async (yargs: any) => {
  const useJSON = yargs.json ?? false;

  const username = yargs._[1];

  if (!username) {
    log.error('you need to pass <username> in order for this to work');
  }

  const client = new GraphQLClient(gqlURL);

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
    if (useJSON) return console.log(JSON.stringify(res.getUserByName));
    log.info(res.getUserByName);
  });
};
