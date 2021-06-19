import { ApolloError } from 'apollo-server-errors';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Answer from '@entities/Answer';
import Question from '@entities/Question';
import NewAnswerInput from './NewAnswerInput';

// @bcg-resolver(mutation, createAnswer, answer)

@Resolver()
export class NewAnswerResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async createAnswer(
    @Arg('questionId') questionId: string,
    @Arg('data') data: NewAnswerInput,
    @Ctx() { getUser }: ContextType
  ) {
    const question = await Question.findOne(questionId);

    if (!question) return new ApolloError('Question not found');

    const newAnswer = Answer.create();
    Answer.merge(newAnswer, data);

    newAnswer.createdAt = String(Date.now());

    newAnswer.author = Promise.resolve(await getUser());
    newAnswer.question = Promise.resolve(question);
    newAnswer.save();
    return true;
  }
}
