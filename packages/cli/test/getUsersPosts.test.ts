import testCommand from './helper';
import { matchers } from 'jest-json-schema';
import { post as postSchema } from './schemas/postSchema';
import { gql, GraphQLClient } from 'graphql-request';
import { gqlURL } from '@oasis-sh/shared';

expect.extend(matchers);

describe("getting a user's posts", () => {
  const [output, error] = testCommand('getUsersPosts', [
    'dulguuncodes',
    '--json',
    '--limit',
    '5',
    '--offset',
    '2',
  ]);

  expect(error).toBeNull();

  const data = JSON.parse(output);

  const client = new GraphQLClient(gqlURL);

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
              message
              createdAt
              lastEdited
              topics
              author {
                id
                avatar
                username
                name
              }
              isUpvoted
              isDownvoted
              upvotes
              downvotes
              comments(limit: 0, offset: 0) {
                total
              }
            }
            hasMore
            total
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
    expect(data.posts).toEqual(response.userOnlyPosts.posts);
  });

  it('yields valid data', () => {
    expect(error).toBeNull();

    data.posts.items.forEach((post) => {
      expect(post).toMatchSchema(postSchema);
    });
  });

  it('rejects incomplete requests', () => {
    const [_, error] = testCommand('getUsersPosts', ['--json']);

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
              message
              createdAt
              lastEdited
              topics
              author {
                id
                avatar
                username
                name
              }
              isUpvoted
              isDownvoted
              upvotes
              downvotes
              comments(limit: 0, offset: 0) {
                total
              }
            }
            hasMore
            total
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
    expect(data.posts.items).toEqual(response.userOnlyPosts.posts.items);
  });
});
