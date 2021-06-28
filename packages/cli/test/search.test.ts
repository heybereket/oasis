import { execCommand } from './helper';
import { query as querySchema } from './schemas/querySchema';
import { matchers } from 'jest-json-schema';

expect.extend(matchers);

describe('searching', () => {
  const [output, error] = execCommand('search', ['hello', '--json']);

  expect(error).toBeNull();

  const data = JSON.parse(output);

  it('yields valid data', () => {
    data.forEach((queryResult: any) => {
      expect(queryResult).toMatchSchema(querySchema);
    });
  });

  it('rejects incomplete requests', () => {
    const [_, error] = execCommand('search', ['--json']);

    expect(error).not.toBeNull();
  });
});
