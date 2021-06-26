import testCommand from './helper';
import { post as postSchema } from './schemas/postSchema';
import { matchers } from 'jest-json-schema';
import { gqlURL } from '@oasis-sh/shared';
import { request, gql } from 'graphql-request';
expect.extend(matchers);

describe('fetching posts', () => {
  it('gets the right amount of posts', async () => {
    const [output, error] = testCommand('fetchPosts', '--json --limit 8');

    expect(error).toBeNull();

    const parsed = JSON.parse(output);
    expect(parsed.paginatePosts.length).toBe(8);
  });

  it('applies limits and offsets correctly', async () => {
    const [output, error] = testCommand(
      'fetchPosts',
      '--json --limit 4 --offset 5'
    );

    expect(error).toBeNull();

    const data = JSON.parse(output);

    const query = gql`
      query paginatePosts($postsLimit: Float!, $postsOffset: Float!) {
        paginatePosts(limit: $postsLimit, offset: $postsOffset) {
          message
          author {
            id
            name
            username
          }
          downvotes
          upvotes
        }
      }
    `;

    const response = await request(gqlURL, query, {
      postsLimit: 4,
      postsOffset: 5,
    });

    expect(response).toEqual(data);
  });

  it('gets valid data', () => {
    const [output, error] = testCommand('fetchPosts', '--json');

    expect(error).toBeNull();

    const data = JSON.parse(output);

    data.paginatePosts.forEach((post: any) => {
      expect(post).toMatchSchema(postSchema);
    });
  });

  it('dumps valid json', () => {
    const [output, error] = testCommand('fetchPosts', '--json');

    expect(error).toBeNull();

    JSON.parse(output);
  });
});
