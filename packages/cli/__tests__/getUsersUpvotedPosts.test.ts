import { post as postSchema } from './schemas/postSchema';
import { execCommand } from './helper';
import { matchers } from 'jest-json-schema';

expect.extend(matchers);

describe("getting a user's upvoted posts", () => {
  const [output, error] = execCommand('get_users_upvoted_posts', [
    'bereket',
    '--json',
  ]);

  expect(error).toBeNull();

  const data = JSON.parse(output);

  it('yields valid data', () => {
    data.items.forEach((post: any) => {
      expect(post).toMatchSchema(postSchema);
    });
  });

  it.todo('rejects incomplete requests');
});
