import { Arg, Query, Resolver } from "type-graphql";
import Post from "../../../entity/Post";

@Resolver()
export default class PaginatePosts {
  @Query(() => [Post])
  paginatePosts(@Arg("offset") offset: number, @Arg("limit") limit: number) {
    return Post.paginate(offset, limit);
  }
}
