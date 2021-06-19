import User from '@entities/User';
import { getRepository } from 'typeorm';
import { generatedNumber } from '@utils/index';
import { usernameRegex } from '@lib/constants';
import { ApolloError } from 'apollo-server-express';

export const checkUsername = async (username: string): Promise<string> => {
  const existingWithUsername = await getRepository(User)
    .createQueryBuilder('users')
    .where('LOWER(username) = LOWER(:username)', { username })
    .getCount();

  if (existingWithUsername !== 0) {
    return username + generatedNumber(4);
  } else if (!usernameRegex.test(username)) {
    throw new ApolloError('Invalid Username.');
  } else {
    return username;
  }
};
