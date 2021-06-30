import * as shared from '../utils/output/log';
import { GraphQLClient, gql } from 'graphql-request';
import { BaseArguments } from '../types/arguments';

interface GetPostByIdArguments extends BaseArguments {
  id: string;
  json: boolean;
}

export const command = 'get_post_by_id <id> [json]';
export const desc =
  'Queries the Oasis API for a specific post given an ID. Returns a single post, may return null if no post is found with the given ID';

export const builder = {
  id: {
    type: 'string',
    describe: 'the post id to query for, must be a string',
  },
  json: {
    type: 'boolean',
    describe:
      'writes the raw JSON to stdout, powerful when used with jq (a JSON processor)',
  },
};

export const handler = async (yargs: GetPostByIdArguments) => {
  const client = new GraphQLClient(yargs.server, {
    headers: { authorization: yargs.auth },
  });

  const query = gql`
    query getPostById($id: String!) {
      getPost(id: $id) {
        author {
          id
          name
          username
          badges {
            description
            id
            imagePath
          }
          avatar
        }
        createdAt
        downvotes
        id
        lastEdited
        upvotes
        message
        resort {
          id
          description
          logo
          name
        }
        comments(limit: 0, offset: 0) {
          total
        }
        topics
        isUpvoted
        isDownvoted
        imageName
      }
    }
  `;

  const { getPost } = await client.request(query, { id: yargs.id });

  if (yargs.json) return console.log(JSON.stringify(getPost));
  shared.info(getPost);
};
