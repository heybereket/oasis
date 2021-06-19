import { ApolloError } from 'apollo-server-errors';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Post from '@entities/Post';
import { hasPermission } from '@utils/common/hasPermission';
import { Role } from '@enums/Roles';
import EditPostInput from './EditPostInput';

// @bcg-resolver(mutation, editPost, post)

@Resolver()
export class EditPostResolver {
  @Mutation(() => Boolean)
  async editPost(
    @Arg('postId') postId: string,
    @Arg('data') data: EditPostInput,
    @Ctx() { uid, getUser }: ContextType
  ) {
    if (data.message.length < 1 || data.message.length > 1000) {
      throw new ApolloError(
        'Messages need to be more than 0 chars and less than 1000'
      );
    }

    const post = await Post.findOne(postId);

    if (!post) throw new ApolloError('Post not found');

    // If the user isn't the author or a moderator, don't allow the edit
    const author = await post.author;
    if (
      author.id !== uid &&
      !hasPermission((await getUser()).roles, Role.Moderator)
    ) {
      throw new ApolloError('You do not have permission to edit this post');
    }

    Object.assign(post, data);

    post.lastEdited = String(Date.now());

    await post.save();
    return true;
  }
}
