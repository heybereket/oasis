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

    const dislikedAnswers = await user.dislikedAnswers;
    let alreadydisliked = false;
    const dislikedAnswersMinusNew: Answer[] = [];
    dislikedAnswers.forEach((answer) => {
      if (answer.id === answerId) {
        alreadydisliked = true;
      } else {
        dislikedAnswersMinusNew.push(answer);
      }
    });
    if (like) {
      if (!alreadyliked) {
        if (alreadydisliked) {
          user.dislikedAnswers = Promise.resolve(dislikedAnswersMinusNew);
        }
        user.likedAnswers = Promise.resolve([...likedAnswers, answer]);
      } else {
        user.likedAnswers = Promise.resolve(likedAnswersMinusNew);
      }
    } else if (dislike) {
      if (!alreadydisliked) {
        if (alreadyliked) {
          user.likedAnswers = Promise.resolve(likedAnswersMinusNew);
        }
        user.dislikedAnswers = Promise.resolve([...dislikedAnswers, answer]);
      } else {
        user.dislikedAnswers = Promise.resolve(dislikedAnswersMinusNew);
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
  async dislikes(@Root() answer: Answer) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.dislikedAnswers`, 'answer', 'answer.id = :id', {
        id: answer.id,
      })
      .getCount();
  }
}
