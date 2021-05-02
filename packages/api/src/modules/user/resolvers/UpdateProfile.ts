import { AuthenticationError } from 'apollo-server-micro';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import User from '../../../entity/User';
import { adminDB } from '../../../utils/common/admin-db';
import { generateSafeUsername } from '../../../utils/generateSafeUsername';
import UpdateProfileInput from '../UpdateProfileInput';

@Resolver()
export default class UpdateProfile {
  @Mutation(() => Boolean)
  async changeBanner(@Arg('bannerUrl') bannerUrl: string, @Ctx() ctx: any) {
    if (ctx.hasAuth) {
      adminDB
        .collection('users')
        .doc(ctx.uid)
        .set({ banner: bannerUrl }, { merge: true });
      return true;
    } else {
      return new AuthenticationError('Unable to edit profile. Try logging in.');
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async updateProfile(@Arg('data') data: UpdateProfileInput, @Ctx() ctx: any) {
    if (data.username)
      data.username = await generateSafeUsername(data.username.toLowerCase());

    await User.mutate(ctx.id, data, { merge: true });
    return true;
  }
}
