import User from '../entities/User';
import { getRepository } from 'typeorm';
import { generatedNumber } from './common';

export const generateSafeUsername = async (
  username: string
): Promise<string> => {
  const existingWithUsername = await getRepository(User)
    .createQueryBuilder('users')
    .where('LOWER(username) = LOWER(:username)', { username })
    .getCount();

  if (existingWithUsername !== 0) {
    return username + generatedNumber(4);
  } else {
    return username;
  }
};
