import Question from '@entities/Question';
import { ContextType } from '@root/server';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(() => Question)
export class GetIsLikedDislikedResolver {
  @FieldResolver(() => Boolean)
  async isLiked(
    @Root() question: Question,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.likedQuestions).forEach((res) => {
        if (res.id === question.id) {
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
    @Root() question: Question,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.dislikedQuestions).forEach((res) => {
        if (res.id === question.id) {
          retValue = true;
        }
      });
      return retValue;
    } else {
      return false;
    }
  }
}
