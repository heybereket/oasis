import Comment from "../../../entity/Comment";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export default class GetCommentResolver {
  @Query(() => Comment, { nullable: true })
  async getComment(@Arg("id") id: string) {
    return Comment.findOne(id);
  }
}
