import { Query, Resolver } from "type-graphql";
import User from "../../../entity/User";

@Resolver()
export default class AllUsersResolver {
  @Query(() => [User])
  async allUsers() {
    return User.find();
  }
}
