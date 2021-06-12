import { ApolloError } from 'apollo-server-errors';
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Float,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import User from '@entities/User';
import Answer from '@entities/Answer';

// @bcg-resolver(mutation, likeDislikeAnswer, answer)

@Resolver(() => Answer)
export class LikeDislikeAnswerResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async likeDislikeAnswer(
    @Arg('answerId') answerId: string,
    @Arg('like') like: boolean,
    @Arg('dislike') dislike: boolean,
    @Ctx() { getUser }: ContextType
  ) {
    const answer = await Answer.findOne(answerId);

    if (!answer) throw new ApolloError('Answer not found');

    if ((like && dislike) || (!like && !dislike)) {
      throw new ApolloError('Please select like or dislike');
    }
  }

  @FieldResolver(() => Float)
  async likes(@Root() answer: Answer) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.upvotedAnswers`, 'answer', 'answer.id = :id', {
        id: answer.id,
      })
      .getCount();
  }

  @FieldResolver(() => Float)
  async dislikes(@Root() answer: Answer) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.downvotedAnswers`, 'answer', 'answer.id = :id', {
        id: answer.id,
      })
      .getCount();
  }
}
