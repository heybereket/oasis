import Post from "../../../entity/Post";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export default class GetPostResolver {
  @Query(() => Post, { nullable: true })
  async getPost(@Arg("id") id: string) {
    return Post.findOne(id);
  }
}
