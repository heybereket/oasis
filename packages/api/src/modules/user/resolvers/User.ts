import User from '../../../entity/User';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ContextType } from '../../../utils/contextFromToken';
import { AuthenticationError } from 'apollo-server-errors';
import { adminDB } from '../../../utils/admin-db';

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

  @Mutation(() => Boolean)
  async changeBio(@Arg('bio') newBio: string, @Ctx() ctx: any) {
    if (ctx.hasAuth) {
      adminDB
        .collection('users')
        .doc(ctx.uid)
        .set({ bio: newBio }, { merge: true });
      return true;
    } else {
      return new AuthenticationError('Please log in to change your bio');
    }
  }

  @Mutation(() => Boolean)
  async changeUsername(@Arg('username') newUsername: string, @Ctx() ctx: any) {
    if (ctx.hasAuth) {
      adminDB
        .collection('users')
        .doc(ctx.uid)
        .set({ username: newUsername.toLowerCase() }, { merge: true });
      return true;
    } else {
      return new AuthenticationError('Please log in to change your username');
    }
  }

  @Mutation(() => Boolean)
  async changeDisplayName(
    @Arg('displayName') newName: string,
    @Ctx() ctx: any
  ) {
    if (ctx.hasAuth) {
      adminDB
        .collection('users')
        .doc(ctx.uid)
        .set({ name: newName }, { merge: true });
      return true;
    } else {
      return new AuthenticationError(
        'Please log in to change your display name'
      );
    }
  }

  @Mutation(() => Boolean)
  async changeAvatar(@Arg('avatar') newAvatar: string, @Ctx() ctx: any) {
    if (ctx.hasAuth) {
      adminDB
        .collection('users')
        .doc(ctx.uid)
        .set({ avatar: newAvatar }, { merge: true });
      return true;
    } else {
      return new AuthenticationError('Please log in to change your avatar');
    }
  }
}
