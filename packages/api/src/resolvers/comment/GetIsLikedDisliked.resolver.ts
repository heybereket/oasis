import Comment from '@entities/Comment';
import { ContextType } from '@root/server';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(() => Comment)
export class GetIsUpvotedDownvotedResolver {
  @FieldResolver(() => Boolean)
  async isUpvoted(
    @Root() comment: Comment,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.upvotedComments).forEach((res) => {
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
  async isDownvoted(
    @Root() comment: Comment,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.downvotedComments).forEach((res) => {
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
