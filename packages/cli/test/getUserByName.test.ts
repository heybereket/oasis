import testCommand from './helper';
import { user as userSchema } from './schemas/userSchema';
import { matchers } from 'jest-json-schema';

expect.extend(matchers);

describe('getting user by name', () => {
  it('gets valid data', () => {
    const [output, error] = testCommand('getUserByName', [
      'dulguuncodes',
      '--json',
    ]);

    expect(error).toBeNull();

    const parsed = JSON.parse(output);
    expect(parsed).toMatchSchema(userSchema);
  });

  it('retrieves the correct user', () => {
    const [output, error] = testCommand('getUserByName', [
      'dulguuncodes',
      '--json',
    ]);

    expect(error).toBeNull();
    expect(output).not.toBeNull();

    const parsed = JSON.parse(output);

    expect(parsed.name).toEqual('dulguuncodes');
    expect(parsed.username).toEqual('dulguuncodes');
  });

  it('rejects incomplete requests', () => {
    const [_, error] = testCommand('getUserByName', ['--json']);

    expect(error).not.toBeNull();
  });

  it('dumps the raw json', () => {
    const [output, error] = testCommand('getUserByName', [
      'bereket',
      '--json',
    ]);

    expect(error).toBeNull();

    const data = JSON.parse(output);

    expect(data).toMatchSchema(userSchema);
  });
});
