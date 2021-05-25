import User from '@entities/User';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { checkUsername } from '@utils/auth/checkUsername';
import UpdateProfileInput from './UpdateProfileInput';
import { ContextType } from '@root/apolloServer';
import { ApolloError } from 'apollo-server-errors';
import { BCQuery } from '@root/bot-client-gen';

@Resolver()
export default class UserResolver {
  @Mutation(() => Boolean)
  @Authorized()
  @BCQuery('users', 'boolean')
  async updateProfile(
    @Arg('data') data: UpdateProfileInput,
    @Ctx() { getUser }: ContextType
  ) {
    const user = await getUser();
    const username = data.username;

    if (data.username) {
      const sameNameUser = await User.createQueryBuilder()
        .where('LOWER(username) = LOWER(:username)', { username })
        .getOne();
      if (sameNameUser) {
        return new ApolloError(
          'Username is taken please request a safe Username',
          'USERNAME_TAKEN'
        );
      }
    }

    User.merge(user, data);

    await user.save();
    return true;
  }

  @Query(() => String)
  async getAvailableUsername(@Arg('username') username: string) {
    return checkUsername(username.toString());
  }
}
