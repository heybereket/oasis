import { Query, Resolver } from "type-graphql";
import Comment from "../../../entity/Comment";

@Resolver()
export default class AllCommentsResolver {
  @Query(() => [Comment])
  async allComments() {
    return Comment.find();
  }
}
