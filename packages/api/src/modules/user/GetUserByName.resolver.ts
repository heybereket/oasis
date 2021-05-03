import { Query, Arg } from "type-graphql";
import { getRepository } from "typeorm";
import User from "../../entities/User";

export class GetUserByNameResolver {
  @Query(() => User, { nullable: true })
  async getUserByName(@Arg("username") username: string) {
    const repo = getRepository(User);
    const user: User = await repo
      .createQueryBuilder()
      .where("LOWER(username) = :username", {
        username: username.toLowerCase(),
      })
      .getOne();
    return user;
  }
}
