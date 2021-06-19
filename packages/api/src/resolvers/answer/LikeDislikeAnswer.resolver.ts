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
import { ContextType } from '@root/server';
import User from '@entities/User';
import Answer from '@entities/Answer';

// @bcg-resolver(mutation, likeDownvoteAnswer, answer)

@Resolver(() => Answer)
export class UpvoteDownvoteAnswerResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async likeDownvoteAnswer(
    @Arg('answerId') answerId: string,
    @Arg('like') like: boolean,
    @Arg('downvote') downvote: boolean,
    @Ctx() { getUser }: ContextType
  ) {
    const answer = await Answer.findOne(answerId);

    if (!answer) throw new ApolloError('Answer not found');

    if ((like && downvote) || (!like && !downvote)) {
      throw new ApolloError('Please select like or downvote');
    }

    const user = await getUser();

    const likedAnswers = await user.likedAnswers;
    let alreadyliked = false;
    const likedAnswersMinusNew: Answer[] = [];
    likedAnswers.forEach((answer) => {
      if (answer.id === answerId) {
        alreadyliked = true;
      } else {
        likedAnswersMinusNew.push(answer);
      }
    });

    const downvotedAnswers = await user.downvotedAnswers;
    let alreadydownvoted = false;
    const downvotedAnswersMinusNew: Answer[] = [];
    downvotedAnswers.forEach((answer) => {
      if (answer.id === answerId) {
        alreadydownvoted = true;
      } else {
        downvotedAnswersMinusNew.push(answer);
      }
    });
    if (like) {
      if (!alreadyliked) {
        if (alreadydownvoted) {
          user.downvotedAnswers = Promise.resolve(downvotedAnswersMinusNew);
        }
        user.likedAnswers = Promise.resolve([...likedAnswers, answer]);
      } else {
        user.likedAnswers = Promise.resolve(likedAnswersMinusNew);
      }
    } else if (downvote) {
      if (!alreadydownvoted) {
        if (alreadyliked) {
          user.likedAnswers = Promise.resolve(likedAnswersMinusNew);
        }
        user.downvotedAnswers = Promise.resolve([...downvotedAnswers, answer]);
      } else {
        user.downvotedAnswers = Promise.resolve(downvotedAnswersMinusNew);
      }
    }

    answer.save();
    user.save();

    return true;
  }

  @FieldResolver(() => Float)
  async likes(@Root() answer: Answer) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.likedAnswers`, 'answer', 'answer.id = :id', {
        id: answer.id,
      })
      .getCount();
  }

  @FieldResolver(() => Float)
  async downvotes(@Root() answer: Answer) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.downvotedAnswers`, 'answer', 'answer.id = :id', {
        id: answer.id,
      })
      .getCount();
  }
}
