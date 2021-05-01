import User from '../../../entity/User';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export default class GetUserByNameResolver {
  @Query(() => User, { nullable: true })
  async getUserByName(@Arg('username') username: string) {
    const users = await User.query('username_lower', username.toLowerCase());
    return users;
  }
}
