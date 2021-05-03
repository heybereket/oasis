import User from "../../entities/User";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { AuthenticationError } from "apollo-server-errors";
import { generateSafeUsername } from "../../utils/generateSafeUsername";
import UpdateProfileInput from "./UpdateProfileInput";
import { ContextType } from "../../apolloServer";

@Resolver()
export default class UserResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async updateProfile(
    @Arg("data") data: UpdateProfileInput,
    @Ctx() { getUser }: ContextType
  ) {
    if (data.username)
      data.username = await generateSafeUsername(data.username.toLowerCase());

    const user = await getUser();
    User.merge(user, data);

    await user.save();
    return true;
  }
}
