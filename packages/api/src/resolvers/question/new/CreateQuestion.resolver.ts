import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Question from '@entities/Question';
import { customAlphabet } from 'nanoid';
import CreateQuestionInput from './CreateQuestionInput';

// @bcg-resolver(mutation, createQuestion, question)

@Resolver()
export class CreateQuestionResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async createQuestion(
    @Arg('data') data: CreateQuestionInput,
    @Ctx() { getUser }: ContextType
  ) {
    const newQuestion = Question.create();
    const nanoid = customAlphabet('1234567890abcdef', 10);
    Question.merge(newQuestion, data);

    newQuestion.createdAt = String(Date.now());

    newQuestion.author = Promise.resolve(await getUser());
    newQuestion.createdAt = String(Date.now());
    newQuestion.id = nanoid();

    newQuestion.save();
    return true;
  }
}
