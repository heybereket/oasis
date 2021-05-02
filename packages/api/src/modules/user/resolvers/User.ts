import User from '../../../entity/User';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { ContextType } from '../../../utils/contextFromToken';

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async getUserByName(
    @Arg('username') username: string,
    @Ctx() ctx: ContextType
  ) {
    const users = await User.query('username', username.toLowerCase());
    return users;
  }
}
