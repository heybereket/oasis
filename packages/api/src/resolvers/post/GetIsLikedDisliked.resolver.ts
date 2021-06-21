import Post from '@entities/Post';
import { ContextType } from '@root/server';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(() => Post)
export class GetIsUpvotedDownvotedResolver {
  @FieldResolver(() => Boolean)
  async isUpvoted(
    @Root() post: Post,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.upvotedPosts).forEach((res) => {
        if (res.id === post.id) {
          retValue = true;
        }
      });
      return retValue;
    } else {
      return false;
    }
  }

  @FieldResolver(() => Boolean)
  async isDownvoted(
    @Root() post: Post,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.downvotedPosts).forEach((res) => {
        if (res.id === post.id) {
          retValue = true;
        }
      });
      return retValue;
    } else {
      return false;
    }
  }
}
