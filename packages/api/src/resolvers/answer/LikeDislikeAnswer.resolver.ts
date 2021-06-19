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
    const answer = await Answer.findOne(answerId);

    if (!answer) throw new ApolloError('Answer not found');

    if ((upvote && downvote) || (!upvote && !downvote)) {
      throw new ApolloError('Please select upvote or downvote');
    }

    const user = await getUser();

    const upvotedAnswers = await user.upvotedAnswers;
    let alreadyupvoted = false;
    const upvotedAnswersMinusNew: Answer[] = [];
    upvotedAnswers.forEach((answer) => {
      if (answer.id === answerId) {
        alreadyupvoted = true;
      } else {
        upvotedAnswersMinusNew.push(answer);
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
    if (upvote) {
      if (!alreadyupvoted) {
        if (alreadydownvoted) {
          user.downvotedAnswers = Promise.resolve(downvotedAnswersMinusNew);
        }
        user.upvotedAnswers = Promise.resolve([...upvotedAnswers, answer]);
      } else {
        user.upvotedAnswers = Promise.resolve(upvotedAnswersMinusNew);
      }
    } else if (downvote) {
      if (!alreadydownvoted) {
        if (alreadyupvoted) {
          user.upvotedAnswers = Promise.resolve(upvotedAnswersMinusNew);
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
  async upvotes(@Root() answer: Answer) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.upvotedAnswers`, 'answer', 'answer.id = :id', {
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
