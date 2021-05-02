import { AuthenticationError } from 'apollo-server-micro';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import User from '../../../entity/User';
import { adminDB } from '../../../utils/common/admin-db';
import { customObjectToDict } from '../../../utils/common/customObjectToDict';
import { generateSafeUsername } from '../../../utils/generateSafeUsername';
import UpdateProfileInput from '../UpdateProfileInput';

@Resolver()
export default class UpdateProfile {
  @Mutation(() => Boolean)
  @Authorized()
  async updateProfile(@Arg('data') data: UpdateProfileInput, @Ctx() ctx: any) {
    if (data.username)
      data.username = await generateSafeUsername(data.username.toLowerCase());

    await User.mutate(ctx.uid, customObjectToDict(data), { merge: true });
    return true;
  }
}
