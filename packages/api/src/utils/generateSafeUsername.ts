import { adminDB } from './admin-db';
import { generatedNumber } from './lib';

export const generateSafeUsername = async (
  username: string
): Promise<string> => {
  const checkUsername = await adminDB
    .collection('users')
    .where('username', '==', username)
    .get();

  if (checkUsername.size !== 0) {
    return username + generatedNumber(4);
  } else {
    return username;
  }
};
