import Comment from '@entities/Comment';
import { ContextType } from '@root/apolloServer';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(() => Comment)
export class GetIsLikedDislikedResolver {
  @FieldResolver(() => Boolean)
  async isLiked(
    @Root() comment: Comment,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.likedComments).forEach((res) => {
        if (res.id === comment.id) {
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
    @Root() comment: Comment,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.dislikedComments).forEach((res) => {
        if (res.id === comment.id) {
          retValue = true;
        }
      });
      return retValue;
    } else {
      return false;
    }
  }
}
