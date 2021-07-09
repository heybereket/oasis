import * as log from '../utils/output/log';
import { gql, GraphQLClient } from 'graphql-request';
import { BaseArguments } from '../types/arguments';

interface GetUserByNameArguments extends BaseArguments {
  username: string;
  json: boolean;
}

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

export const handler = async (yargs: GetUserByNameArguments) => {
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

  const client = new GraphQLClient(yargs.server, {
    headers: { authorization: yargs.auth },
  });

  const { getUserByName } = await client.request(query, { username: yargs.username })

  if (yargs.json) return console.log(JSON.stringify(getUserByName));
  log.info(getUserByName);
};
