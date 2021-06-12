import { ApolloError } from 'apollo-server-errors';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Comment from '@entities/Comment';
import { hasPermission } from '@utils/common/hasPermission';
import { Role } from '@enums/Roles';
import EditCommentInput from './EditCommentInput';

// @bcg-resolver(mutation, editComment, comment)

@Resolver()
export class EditCommentResolver {
  @Mutation(() => Boolean)
  async editComment(
    @Arg('commentId') commentId: string,
    @Arg('data') data: EditCommentInput,
    @Ctx() { uid, getUser }: ContextType
  ) {
    const comment = await Comment.findOne(commentId);

    if (!comment) throw new ApolloError('Comment not found');

    // If the user isn't the author or a moderator, don't allow the edit
    const author = await comment.author;
    if (
      author.id !== uid &&
      !hasPermission((await getUser()).roles, Role.Moderator)
    ) {
      throw new ApolloError('You do not have permission to edit this comment!');
    }

    Object.assign(comment, data);

    comment.lastEdited = String(Date.now());

    await comment.save();
    return true;
  }
}
