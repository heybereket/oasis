import { Arg, Query, Resolver } from "type-graphql";
import Comment from "../../../entity/Comment";

@Resolver()
export default class PaginateComments {
  @Query(() => [Comment])
  paginateComments(@Arg("offset") offset: number, @Arg("limit") limit: number) {
    return Comment.paginate(offset, limit);
  }
}
