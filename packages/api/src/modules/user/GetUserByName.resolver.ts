import { Query, Arg } from "type-graphql";
import User from "../../entities/User";

export class GetUserByNameResolver {
  @Query(() => User, { nullable: true })
  async getUserByName(@Arg("username") username: string) {
    const user: User = await User.createQueryBuilder()
      .where("LOWER(username) = :username", {
        username: username.toLowerCase(),
      })
      .getOne();
    return user;
  }
}
