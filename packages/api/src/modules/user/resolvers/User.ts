import User from '../../../entity/User';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ContextType } from '../../../utils/contextFromToken';
import { AuthenticationError } from 'apollo-server-errors';
import { adminDB } from '../../../utils/common/admin-db';

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

  @Mutation(() => Boolean)
  async changeBanner(@Arg('bannerUrl') bannerUrl: string, @Ctx() ctx: any) {
    if (ctx.hasAuth) {
      adminDB
        .collection('users')
        .doc(ctx.uid)
        .set({ banner: bannerUrl }, { merge: true });
      return true;
    } else {
      return new AuthenticationError('Please login to change your banner.');
    }
  }
}
