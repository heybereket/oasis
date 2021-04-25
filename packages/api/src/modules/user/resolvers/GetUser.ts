import User from "../../../entity/User";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export default class GetUserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Arg("id") id: string) {
    return User.findOne(id);
  }
}
