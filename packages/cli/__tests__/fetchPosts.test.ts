import { execCommand, serverURL } from './helper';
import { post as postSchema } from './schemas/postSchema';
import { matchers } from 'jest-json-schema';
import { GraphQLClient, gql } from 'graphql-request';
expect.extend(matchers);

describe('fetching posts', () => {
  const [output, error] = execCommand('fetch_posts', [
    '--json',
    '--limit',
    '8',
    '--offset',
    '5',
  ]);

  expect(error).toBeNull();

  const data = JSON.parse(output);
  const client = new GraphQLClient(serverURL);

  it('gets the right amount of posts', async () => {
    expect(data.length).toBe(8);
  });

  it('applies limits and offsets correctly', async () => {
    expect(error).toBeNull();

    const data = JSON.parse(output);

    const query = gql`
      query paginatePosts($postsLimit: Float!, $postsOffset: Float!) {
        paginatePosts(limit: $postsLimit, offset: $postsOffset) {
          id
        }
      }
    `;

    const { paginatePosts } = await client.request(query, {
      postsLimit: 8.0,
      postsOffset: 5.0,
    });

    paginatePosts.forEach((post: any, index: number) => {
      expect(post.id).toEqual(data[index].id);
    });
  });

  it('gets valid data', () => {
    data.forEach((post: any) => {
      expect(post).toMatchSchema(postSchema);
    });
  });
});
