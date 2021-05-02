import User from '../../../entity/User';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ContextType } from '../../../utils/contextFromToken';
import { AuthenticationError } from 'apollo-server-errors';
import { adminDB } from '../../../utils/common/admin-db';
import { generateSafeUsername } from '../../../utils/generateSafeUsername';

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
