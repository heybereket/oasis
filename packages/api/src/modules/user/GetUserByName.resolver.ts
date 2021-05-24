import { Query, Arg, Resolver } from 'type-graphql';
import User from '@entities/User';
import { BCQuery } from '@root/bot-client-gen';

@Resolver()
export class GetUserByNameResolver {
  @Query(() => User, { nullable: true })
  @BCQuery('users', 'User')
  async getUserByName(@Arg('username') username: string) {
    return await User.createQueryBuilder('user')
      .where('LOWER(user.username) = LOWER(:username)', { username })
      .getOne();
  }
}
