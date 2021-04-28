import { Query, Resolver } from "type-graphql";
import Post from "../../../entity/Post";

@Resolver()
export default class AllPostsResolver {
  @Query(() => [Post])
  async allPosts() {
    return Post.find();
  }
}
