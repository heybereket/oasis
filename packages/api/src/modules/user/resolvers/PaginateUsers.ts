import { Arg, Query, Resolver } from "type-graphql";
import User from "../../../entity/User";

@Resolver()
export default class PaginateUsers {
  @Query(() => [User])
  paginateUsers(@Arg("offset") offset: number, @Arg("limit") limit: number) {
    return User.paginate(offset, limit);
  }
}
