import { Query, Arg, Resolver } from 'type-graphql';
import User from '@entity/User';

@Resolver()
export class GetUserByNameResolver {
  @Query(() => User, { nullable: true })
  async getUserByName(@Arg('username') username: string) {
    return await User.createQueryBuilder('user')
      .where('LOWER(user.username) = LOWER(:username)', { username })
      .getOne();
  }
}
