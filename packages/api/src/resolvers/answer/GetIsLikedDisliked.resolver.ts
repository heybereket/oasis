import Answer from '@entities/Answer';
import { ContextType } from '@root/server';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(() => Answer)
export class GetIsLikedDislikedResolver {
  @FieldResolver(() => Boolean)
  async isLiked(
    @Root() comment: Answer,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.upvotedAnswers).forEach((res) => {
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
    @Root() comment: Answer,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.downvotedAnswers).forEach((res) => {
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
