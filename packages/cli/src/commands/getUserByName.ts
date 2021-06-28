import * as log from '@oasis-sh/shared';
import { gqlURL } from '@oasis-sh/shared';
import { gql, GraphQLClient } from 'graphql-request';

export const command = 'get_user_by_name <username> [json]';
export const desc =
  'Queries posts submitted by <username>. <username> must be a valid user. May return null if user is not found';

export const builder = {
  username: {
    default: undefined,
    describe: "the specified user's name",
  },
  json: {
    type: 'boolean',
    describe:
      'writes the raw JSON to stdout, powerful when used with jq (a JSON processor)',
  },
};

export const handler = async (yargs: any) => {
  const useJSON = yargs.json;

  const username = yargs.username;

  if (!username)
    return log.error('you need to pass <username> in order for this to work');

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
