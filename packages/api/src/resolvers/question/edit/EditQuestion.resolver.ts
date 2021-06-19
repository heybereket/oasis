import { ApolloError } from 'apollo-server-errors';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Question from '@entities/Question';
import { hasPermission } from '@utils/common/hasPermission';
import { Role } from '@enums/Roles';
import EditQuestionInput from './EditQuestionInput';

// @bcg-resolver(mutation, editQuestion, question)

@Resolver()
export class EditQuestionResolver {
  @Mutation(() => Boolean)
  async editQuestion(
    @Arg('questionId') questionId: string,
    @Arg('data') data: EditQuestionInput,
    @Ctx() { uid, getUser }: ContextType
  ) {
    if (data.message.length < 1 || data.message.length > 1000) {
      throw new ApolloError(
        'Messages need to be more than 0 chars and less than 1000'
      );
    }

    const question = await Question.findOne(questionId);

    if (!question) throw new ApolloError('Question not found');

    // If the user isn't the author or a moderator, don't allow the edit
    const author = await question.author;
    if (
      author.id !== uid &&
      !hasPermission((await getUser()).roles, Role.Moderator)
    ) {
      throw new ApolloError('You do not have permission to edit this question');
    }

    Object.assign(question, data);

    question.lastEdited = String(Date.now());

    await question.save();
    return true;
  }
}
