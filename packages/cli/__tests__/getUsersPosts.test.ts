import { execCommand, serverURL } from './helper';
import { matchers } from 'jest-json-schema';
import { post as postSchema } from './schemas/postSchema';
import { gql, GraphQLClient } from 'graphql-request';
expect.extend(matchers);

describe("getting a user's posts", () => {
  const [output, error] = execCommand('get_users_posts', [
    'dulguuncodes',
    '--json',
    '--limit',
    '5',
    '--offset',
    '2',
  ]);

  expect(error).toBeNull();

  const data = JSON.parse(output);

  const client = new GraphQLClient(serverURL);

  it('yields the correct data', async () => {
    const query = gql`
      query getUsersPosts(
        $username: String!
        $postsLimit: Float!
        $postsOffset: Float!
      ) {
        userOnlyPosts: getUserByName(username: $username) {
          posts(offset: $postsOffset, limit: $postsLimit) {
            items {
              id
            }
          }
        }
      }
    `;

    const response = await client.request(query, {
      username: 'dulguuncodes',
      postsLimit: 5.0,
      postsOffset: 2.0,
    });

    expect(error).toBeNull();

    response.userOnlyPosts.posts.items.forEach((post: any, index: number) => {
      expect(post.id).toEqual(data.posts.items[index].id);
    });
  });

  it('yields valid data', () => {
    expect(error).toBeNull();

    data.posts.items.forEach((post) => {
      expect(post).toMatchSchema(postSchema);
    });
  });

  it('rejects incomplete requests', () => {
    const [_, error] = execCommand('get_users_posts', ['--json']);

    expect(error).not.toBeNull();
  });

  it('correctly applies limits and offsets', async () => {
    const query = gql`
      query getUsersPosts(
        $username: String!
        $postsLimit: Float!
        $postsOffset: Float!
      ) {
        userOnlyPosts: getUserByName(username: $username) {
          posts(offset: $postsOffset, limit: $postsLimit) {
            items {
              id
            }
          }
        }
      }
    `;

    const response = await client.request(query, {
      username: 'dulguuncodes',
      postsLimit: 5.0,
      postsOffset: 2.0,
    });

    expect(data.posts.items.length).toEqual(5);
    data.posts.items.forEach((post, index: number) => {
      expect(post.id).toEqual(response.userOnlyPosts.posts.items[index].id);
    });
  });
});
