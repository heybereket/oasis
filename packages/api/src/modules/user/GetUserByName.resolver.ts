import { Query, Arg } from "type-graphql";
import { getRepository } from "typeorm";
import User from "../../entities/User";

export class GetUserByNameResolver {
  @Query(() => User, { nullable: true })
  async getUserByName(@Arg("username") username: string) {
    const users: User[] = await getRepository(User).find({
      username: username.toLowerCase(),
    });
    return users;
  }
}
