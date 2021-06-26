import testCommand from './helper';
import { user as userSchema } from './schemas/userSchema';
import { matchers } from 'jest-json-schema';

expect.extend(matchers);

describe('getting user by name', () => {
  it('gets valid data', () => {
    const [output, error] = testCommand('getUserByName', 'dulguuncodes --json');

    expect(error).toBeNull();

    const parsed = JSON.parse(output);
    expect(parsed).toMatchSchema(userSchema);
  });

  it('retrieves the correct user', () => {
    const [output, error] = testCommand('getUserByName', 'alexover1 --json');

    expect(error).toBeNull();

    const parsed = JSON.parse(output);

    expect(parsed.name).toEqual('Alex');
    expect(parsed.username).toEqual('alexover1');
  });

  it('rejects incomplete requests', () => {
    const [output, error] = testCommand('getUserByName', '--json');

    expect(error).toBeNull();

    console.log(output);
  });
  it.todo('dumps the raw json');
});
