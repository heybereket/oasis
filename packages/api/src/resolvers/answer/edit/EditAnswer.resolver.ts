import { ApolloError } from 'apollo-server-errors';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Answer from '@entities/Answer';
import { hasPermission } from '@utils/common/hasPermission';
import { Role } from '@enums/Roles';
import EditAnswerInput from './EditAnswerInput';

// @bcg-resolver(mutation, editAnswer, answer)

@Resolver()
export class EditAnswerResolver {
  @Mutation(() => Boolean)
  async editAnswer(
    @Arg('answerId') answerId: string,
    @Arg('data') data: EditAnswerInput,
    @Ctx() { uid, getUser }: ContextType
  ) {
    const answer = await Answer.findOne(answerId);

    if (!answer) throw new ApolloError('Answer not found');

    // If the user isn't the author or a moderator, don't allow the edit
    const author = await answer.author;
    if (
      author.id !== uid &&
      !hasPermission((await getUser()).roles, Role.Moderator)
    ) {
      throw new ApolloError('You do not have permission to edit this answer!');
    }

    Object.assign(answer, data);

    answer.lastEdited = String(Date.now());

    await answer.save();
    return true;
  }
}
