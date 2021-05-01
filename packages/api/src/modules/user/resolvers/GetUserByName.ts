import User from '../../../entity/User';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';

@Resolver()
export default class GetUserByNameResolver {
  @Query(() => User, { nullable: true })
  async getUserByName(@Arg('username') username: string, @Ctx() ctx: any) {
    const users = await User.query('username_lower', username.toLowerCase());
    return users;
  }
}
