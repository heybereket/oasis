import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Answer from '@entities/Answer';
import { upvoteDownvote } from '@utils/votes/upvoteDownvoteEntity';
import type User from '@entities/User';

// @bcg-resolver(mutation, upvoteAnswer, answer)
// @bcg-resolver(mutation, downvoteAnswer, answer)

const action = async (upvote: boolean, answerId: string, user: User) =>
  upvoteDownvote<Answer>(
    await Answer.findOne(answerId),
    user,
    upvote,
    !upvote,
    (user) => user.upvotedAnswers,
    (user) => user.downvotedAnswers,
    (user, entities) => (user.upvotedAnswers = Promise.resolve(entities)),
    (user, entities) => (user.downvotedAnswers = Promise.resolve(entities))
  );

@Resolver(() => Answer)
export default class UpvoteDownvoteAnswerResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async upvoteAnswer(
    @Arg('answerId') answerId: string,
    @Ctx() { getUser }: ContextType
  ) {
    return action(true, answerId, await getUser());
  }

  @Mutation(() => Boolean)
  @Authorized()
  async downvoteAnswer(
    @Arg('answerId') answerId: string,
    @Ctx() { getUser }: ContextType
  ) {
    return action(false, answerId, await getUser());
  }
}
