import { execCommand } from './helper';
import { post as postSchema } from './schemas/postSchema';
import { matchers } from 'jest-json-schema';

expect.extend(matchers);

describe("retrieving a post by it's id", () => {
  const [output, error] = execCommand('get_post_by_id', [
    'f04f96755e',
    '--json',
  ]);

  expect(error).toBeNull();

  const data = JSON.parse(output);

  it('fetches expected data', () => {
    expect(data.id).toEqual('f04f96755e');
  });

  it('yields valid data', () => {
    expect(data).toMatchSchema(postSchema);
  });

  it('rejects incomplete requests', () => {
    const [_, error] = execCommand('get_post_by_id', ['--json']);

    expect(error).not.toBeNull();
  });
});
