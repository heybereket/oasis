import { ApolloError } from 'apollo-server-errors';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Post from '@entities/Post';
import { hasPermission } from '@utils/common/hasPermission';
import { Role } from '@root/enums/Roles';

// @bcg-resolver(mutation, deletePost, post)

@Resolver()
export class DeletePostResolver {
  @Mutation(() => Boolean)
  async deletePost(
    @Arg('postId') postId: string,
    @Ctx() { uid, getUser }: ContextType
  ) {
    const post = await Post.findOne(postId);

    if (!post) throw new ApolloError('Post not found');

    // If the user isn't the author or a moderator, don't allow the delete
    const author = await post.author;
    if (
      author.id !== uid &&
      !hasPermission((await getUser()).roles, Role.Moderator)
    ) {
      throw new ApolloError('You do not have permission to edit this post');
    }

    post.remove();

    return true;
  }
}
