import { ApolloError } from 'apollo-server-errors';
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Float,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import { ContextType } from '@root/server';
import User from '@entity/User';
import Comment from '@entity/Comment';

@Resolver(() => Comment)
export class LikeDislikeCommentResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async likeDislikeComment(
    @Arg('commentId') commentId: string,
    @Arg('like') like: boolean,
    @Arg('dislike') dislike: boolean,
    @Ctx() { getUser }: ContextType
  ) {
    const comment = await Comment.findOne(commentId);

    if (!comment) throw new ApolloError('Comment not found');

    if ((like && dislike) || (!like && !dislike)) {
      throw new ApolloError('Please select like or dislike');
    }
  }

  @FieldResolver(() => Float)
  async likes(@Root() comment: Comment) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.likedComments`, 'comment', 'comment.id = :id', {
        id: comment.id,
      })
      .getCount();
  }

  @FieldResolver(() => Float)
  async dislikes(@Root() comment: Comment) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.dislikedComments`, 'comment', 'comment.id = :id', {
        id: comment.id,
      })
      .getCount();
  }
}
