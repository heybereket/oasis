import User from "../../entities/User";
import { getRepository } from 'typeorm';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-errors';
import { generateSafeUsername } from '../../utils/generateSafeUsername';
import UpdateProfileInput from "./UpdateProfileInput";

@Resolver()
export default class UserResolver {
  @Query(() => User, { nullable: true })
  async getUserByName(
    @Arg('username') username: string
  ) {
    const users: User[] = await getRepository(User).find({ username: username.toLowerCase() });
    return users;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async updateProfile(@Arg("data") data: UpdateProfileInput, @Ctx() ctx: any) {
    if (!ctx.hasAuth) return new AuthenticationError("You must be logged in to change your profile.");
    if (data.username) data.username = await generateSafeUsername(data.username.toLowerCase());

    const user = await getRepository(User).findOne(ctx.id);
    User.merge(user, data);
    await user.save();
    return true;
  }
}
