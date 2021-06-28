import testCommand from './helper';
import { matchers } from 'jest-json-schema';
import { post as postSchema } from './schemas/postSchema';
import { request, gql } from 'graphql-request';
import { gqlURL } from '@oasis-sh/shared';

expect.extend(matchers);

describe("getting a user's posts", () => {
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

    const response = await request(gqlURL, query, {
      username: 'dulguuncodes',
      postsLimit: 10.0,
      postsOffset: 0.0,
    });

    const [output, error] = testCommand('getUsersPosts', [
      'dulguuncodes',
      '--json',
    ]);

    expect(error).toBeNull();

    const commandData = JSON.parse(output);

    expect(commandData.posts).toEqual(response.userOnlyPosts.posts);
  });

  it('yields valid data', () => {
    const [output, error] = testCommand('getUsersPosts', [
      'dulguuncodes',
      '--json',
    ]);

    expect(error).toBeNull();

    const commandData = JSON.parse(output);

    commandData.posts.items.forEach((post) => {
      expect(post).toMatchSchema(postSchema);
    });
  });

  it('rejects incomplete requests', () => {
  });

  it('correctly applies limits and offsets', async () => {
    const [output, error] = testCommand('getUsersPosts', [
      'dulguuncodes',
      '--json',
      '--limit',
      '5',
      '--offset',
      '2',
    ]);

    expect(error).toBeNull();

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

    const response = await request(gqlURL, query, {
      username: 'dulguuncodes',
      postsLimit: 5.0,
      postsOffset: 2.0,
    });

    const data = JSON.parse(output);

    expect(data.posts.items.length).toEqual(5);
    expect(data.posts.items).toEqual(response.userOnlyPosts.posts.items);
  });
  it.todo('dumps the raw json');
});
