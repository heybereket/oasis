import { ApolloError } from 'apollo-server-errors';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '../../apolloServer';
import Post from '../../entities/Post';
import { hasPermission } from '../../utils/hasPermission';
import { Role } from '../user/Roles';
import EditPostInput from './EditPostInput';

@Resolver()
export class EditPostResolver {
  @Mutation(() => Boolean)
  async editPost(
    @Arg('postId') postId: string,
    @Arg('data') data: EditPostInput,
    @Ctx() { uid, getUser }: ContextType
  ) {
    const post = await Post.findOne(postId);

    if (!post) throw new ApolloError('Post not found');

    // If the user isn't the author or a moderator, don't allow the edit
    const author = await post.author;
    if (
      author.id !== uid &&
      !hasPermission((await getUser()).roles, Role.Moderator)
    )
      throw new ApolloError('You do not have permission to edit this post');

    Object.assign(post, data);

    post.lastEdited = String(Date.now());

    await post.save();
    return true;
  }
}
