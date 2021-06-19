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
import User from '@entities/User';
import Comment from '@entities/Comment';

// @bcg-resolver(mutation, likeDownvoteComment, comment)

@Resolver(() => Comment)
export class UpvoteDownvoteCommentResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async likeDownvoteComment(
    @Arg('commentId') commentId: string,
    @Arg('like') like: boolean,
    @Arg('downvote') downvote: boolean,
    @Ctx() { getUser }: ContextType
  ) {
    const comment = await Comment.findOne(commentId);

    if (!comment) throw new ApolloError('Comment not found');

    if ((like && downvote) || (!like && !downvote)) {
      throw new ApolloError('Please select like or downvote');
    }

    const user = await getUser();

    const likedComments = await user.likedComments;
    let alreadyliked = false;
    const likedCommentsMinusNew: Comment[] = [];
    likedComments.forEach((comment) => {
      if (comment.id === commentId) {
        alreadyliked = true;
      } else {
        likedCommentsMinusNew.push(comment);
      }
    });

    const downvotedComments = await user.downvotedComments;
    let alreadydownvoted = false;
    const downvotedCommentsMinusNew: Comment[] = [];
    downvotedComments.forEach((comment) => {
      if (comment.id === commentId) {
        alreadydownvoted = true;
      } else {
        downvotedCommentsMinusNew.push(comment);
      }
    });
    if (like) {
      if (!alreadyliked) {
        if (alreadydownvoted) {
          user.downvotedComments = Promise.resolve(downvotedCommentsMinusNew);
        }
        user.likedComments = Promise.resolve([...likedComments, comment]);
      } else {
        user.likedComments = Promise.resolve(likedCommentsMinusNew);
      }
    } else if (downvote) {
      if (!alreadydownvoted) {
        if (alreadyliked) {
          user.likedComments = Promise.resolve(likedCommentsMinusNew);
        }
        user.downvotedComments = Promise.resolve([
          ...downvotedComments,
          comment,
        ]);
      } else {
        user.downvotedComments = Promise.resolve(downvotedCommentsMinusNew);
      }
    }

    comment.save();
    user.save();

    return true;
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
  async downvotes(@Root() comment: Comment) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.downvotedComments`, 'comment', 'comment.id = :id', {
        id: comment.id,
      })
      .getCount();
  }
}
