import { execCommand } from './helper';
import { user as userSchema } from './schemas/userSchema';
import { matchers } from 'jest-json-schema';

expect.extend(matchers);

describe('getting user by name', () => {
  const [output, error] = execCommand('get_user_by_name', ['bereket', '--json']);

  expect(error).toBeNull();
  expect(output).not.toBeNull();

  const data = JSON.parse(output);

  it('retrieves valid data', () => {
    expect(data).toMatchSchema(userSchema);
  });

  it('fetches the correct user', () => {
    const parsed = JSON.parse(output);

    expect(parsed.name).toEqual('Bereket Semagn');
    expect(parsed.username).toEqual('bereket');
  });

  it('rejects incomplete requests', () => {
    const [_, error] = execCommand('get_user_by_name', ['--json']);

    expect(error).not.toBeNull();
  });
});
