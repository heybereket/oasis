import Post from '@entity/Post';
import { ContextType } from '@root/server';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(() => Post)
export class GetIsLikedDislikedResolver {
  @FieldResolver(() => Boolean)
  async isLiked(@Root() post: Post, @Ctx() { getUser, hasAuth }: ContextType) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.likedPosts).forEach((res) => {
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
  async isDisliked(
    @Root() post: Post,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.dislikedPosts).forEach((res) => {
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
