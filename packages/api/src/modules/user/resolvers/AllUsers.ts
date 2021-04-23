import { Query, Resolver } from "type-graphql";

@Resolver()
export default class AllUsersResolver {
  @Query(() => String)
  async allUsers() {
    return "Hello World";
  }

  // @Query(() => [String])
  // async hello(): Promise<string[]> {
  //   return ["Hello", "world"];
  // }
}
