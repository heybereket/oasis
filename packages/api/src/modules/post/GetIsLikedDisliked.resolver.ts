import Post from '@entities/Post';
import { ContextType } from '@root/apolloServer';
import { BCQuery } from '@root/bot-client-gen';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(() => Post)
export class GetIsLikedDislikedResolver {
  @FieldResolver(() => Boolean)
  @BCQuery('post', 'boolean')
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
