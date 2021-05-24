import { ApolloError } from 'apollo-server-errors';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import Comment from '@entities/Comment';
import Post from '@entities/Post';
import NewCommentInput from './NewCommentInput';
import { BCQuery } from '@root/bot-client-gen';

@Resolver()
export class NewCommentResolver {
  @Mutation(() => Boolean)
  @Authorized()
  @BCQuery('comment', 'boolean')
  async createComment(
    @Arg('postId') postId: string,
    @Arg('data') data: NewCommentInput,
    @Ctx() { getUser }: ContextType
  ) {
    const post = await Post.findOne(postId);

    if (!post) return new ApolloError('Post not found');

    const newComment = Comment.create();
    Comment.merge(newComment, data);

    newComment.createdAt = String(Date.now());

    newComment.author = Promise.resolve(await getUser());
    newComment.post = Promise.resolve(post);
    newComment.save();
    return true;
  }
}
