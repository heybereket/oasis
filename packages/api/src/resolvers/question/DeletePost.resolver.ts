import { ApolloError } from 'apollo-server-errors';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Question from '@entities/Question';
import { hasPermission } from '@utils/common/hasPermission';
import { Role } from '@enums/Roles';

// @bcg-resolver(mutation, deleteQuestion, question)

@Resolver()
export class DeleteQuestionResolver {
  @Mutation(() => Boolean)
  async deleteQuestion(
    @Arg('questionId') questionId: string,
    @Ctx() { uid, getUser }: ContextType
  ) {
    const question = await Question.findOne(questionId);

    if (!question) throw new ApolloError('Question not found');

    // If the user isn't the author or a moderator, don't allow the delete
    const author = await question.author;
    if (
      author.id !== uid &&
      !hasPermission((await getUser()).roles, Role.Moderator)
    ) {
      throw new ApolloError('You do not have permission to edit this question');
    }

    question.remove();

    return true;
  }
}
