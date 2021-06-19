import Question from '@entities/Question';
import { ContextType } from '@root/server';
import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(() => Question)
export class GetIsUpvotedDownvotedResolver {
  @FieldResolver(() => Boolean)
  async isUpvoted(
    @Root() question: Question,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.upvotedQuestions).forEach((res) => {
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
  async isDownvoted(
    @Root() question: Question,
    @Ctx() { getUser, hasAuth }: ContextType
  ) {
    if (hasAuth) {
      const user = await getUser();
      let retValue = false;
      (await user.downvotedQuestions).forEach((res) => {
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
