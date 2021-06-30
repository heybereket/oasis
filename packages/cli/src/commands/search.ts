import * as log from '../utils/output/log';
import { gqlURL } from '../lib/constants';
import { gql, GraphQLClient } from 'graphql-request';

interface SearchArguments {
  query: string;
  limit: number;
  json: boolean;
}

export const command = 'search <query|searchquery|q> [limit] [json]';
export const desc =
  'Searches for data from the Oasis API. Can return a range of possible types of data';

export const builder = {
  query: {
    describe: 'the search term to query for',
    type: 'string',
  },
  limit: {
    default: 10.0,
    describe: 'sets limit on the number of objects to query',
    type: 'number | float',
  },
  json: {
    type: 'boolean',
    describe:
      'writes the raw JSON to stdout, powerful when used with jq (a JSON processor)',
  },
};

export const handler = async (yargs: SearchArguments) => {
  const client = new GraphQLClient(gqlURL);

  const useJSON = yargs.json;

  const searchQuery = yargs.query;
  const limit = yargs.limit;

  if (!searchQuery)
    return log.error(
      'you need to pass <search query> in order for this to work'
    );

  const query = gql`
    query Search($searchQuery: String!, $limit: Float!) {
      search(searchQuery: $searchQuery, limit: $limit) {
        __typename
        ... on User {
          id
          userBanner: banner
          avatar
          createdAt
          github
          twitter
          discord
          google
          bio
          username
          verified
          roles
          displayName: name
        }
        ... on Post {
          id
          message
          author {
            username
            avatar
            name
          }
          comments(limit: 0, offset: 0) {
            total
          }
          createdAt
          upvotes
          downvotes
        }
        ... on Resort {
          name
          description
          banner
        }
      }
    }
  `;

  client
    .request(query, {
      searchQuery,
      limit,
    })
    .then((res) => {
      if (useJSON) return console.log(JSON.stringify(res.search));
      log.info(res.search);
    });
};
