import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Resolver,
} from 'type-graphql';
import { ContextType } from '@root/server';
import Answer from '@entities/Answer';
import { upvoteDownvote } from '@utils/votes/upvoteDownvoteEntity';

// @bcg-resolver(mutation, upvoteDownvoteAnswer, answer)

@Resolver(() => Answer)
export class UpvoteDownvoteAnswerResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async upvoteDownvoteAnswer(
    @Arg('answerId') answerId: string,
    @Arg('upvote') upvote: boolean,
    @Arg('downvote') downvote: boolean,
    @Ctx() { getUser }: ContextType
  ) {
    return upvoteDownvote<Answer>(
      await Answer.findOne(answerId),
      await getUser(),
      upvote,
      downvote,
      (user) => user.upvotedAnswers,
      (user) => user.downvotedAnswers,
      (user, entities) => (user.upvotedAnswers = Promise.resolve(entities)),
      (user, entities) => (user.downvotedAnswers = Promise.resolve(entities))
    );
  }

  // @FieldResolver(() => Float)
  // async upvotes(@Root() answer: Answer) {
  //   return User.createQueryBuilder('user')
  //     .innerJoin(`user.upvotedAnswers`, 'answer', 'answer.id = :id', {
  //       id: answer.id,
  //     })
  //     .getCount();
  // }

  // @FieldResolver(() => Float)
  // async downvotes(@Root() answer: Answer) {
  //   return User.createQueryBuilder('user')
  //     .innerJoin(`user.downvotedAnswers`, 'answer', 'answer.id = :id', {
  //       id: answer.id,
  //     })
  //     .getCount();
  // }
}
